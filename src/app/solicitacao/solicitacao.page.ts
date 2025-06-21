import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColetaBackendService, IColetaAddress } from '../services/coleta-backend.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  standalone: false
})
export class SolicitacaoPage implements OnInit {

  formulario: FormGroup;
  enderecoForm: FormGroup;
  mostrarFormEndereco = false;
  enderecos: IColetaAddress[] = [];
  imagemSelecionada: File | null = null;

  constructor(
    private fb: FormBuilder,
    private coletaService: ColetaBackendService,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.formulario = this.fb.group({
      enderecoSel: [null, Validators.required],
      desc: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      dataServico: ['', Validators.required],
      horaServico: ['', Validators.required],
      // Caso queira usar type, descomente abaixo
      type: ['residencial', Validators.required]
    });

    this.enderecoForm = this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.carregarEnderecos();
  }

  carregarEnderecos() {
    this.coletaService.listarEndereco().subscribe({
      next: res => {
        this.enderecos = res.data ?? [];
        if (this.enderecos.length) {
          this.formulario.patchValue({ enderecoSel: 0 });
        }
      },
      error: err => {
        console.error('Erro ao carregar endereços', err);
      }
    });
  }

  buscarEnderecoPorCep() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (!cep || cep.length !== 8) return;

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (res) => {
        if (res.erro) {
          alert('CEP não encontrado');
          return;
        }
        this.enderecoForm.patchValue({
          logradouro: res.logradouro || '',
          bairro: res.bairro || '',
          localidade: res.localidade || '',
          uf: res.uf || ''
        });
      },
      error: () => {
        alert('Erro ao buscar endereço pelo CEP');
      }
    });
  }

async adicionarEndereco() {
  const cepAlert = await this.alertCtrl.create({
    header: 'Novo Endereço',
    inputs: [
      {
        name: 'cep',
        type: 'text',
        placeholder: 'Digite o CEP',
        attributes: {
          maxlength: 9,
          inputmode: 'numeric'
        }
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Buscar',
        handler: async (data) => {
          let cep = (data.cep || '').replace(/\D/g, ''); // Remove qualquer caractere que não seja número

          if (cep.length !== 8) {
            this.alertCtrl.create({
              header: 'Erro',
              message: 'CEP inválido. Deve conter 8 dígitos.',
              buttons: ['OK']
            }).then(a => a.present());
            return false;
          }

          try {
            const resposta: any = await this.http.get(`https://viacep.com.br/ws/${cep}/json/`).toPromise();

            if (resposta.erro) {
              this.alertCtrl.create({
                header: 'CEP não encontrado',
                message: 'Verifique se digitou corretamente.',
                buttons: ['OK']
              }).then(a => a.present());
              return false;
            }

            // Formata o CEP com traço
            const cepFormatado = `${cep.slice(0, 5)}-${cep.slice(5)}`;

            const enderecoAlert = await this.alertCtrl.create({
              header: 'Confirmar Endereço',
              inputs: [
                { name: 'cep', type: 'text', value: cepFormatado, placeholder: 'CEP' },
                { name: 'logradouro', type: 'text', value: resposta.logradouro || '', placeholder: 'Logradouro' },
                { name: 'unidade', type: 'text', value: resposta.unidade || '', placeholder: 'Nº' },
                { name: 'bairro', type: 'text', value: resposta.bairro || '', placeholder: 'Bairro' },
                { name: 'localidade', type: 'text', value: resposta.localidade || '', placeholder: 'Cidade' },
                { name: 'uf', type: 'text', value: resposta.uf || '', placeholder: 'UF', attributes: { maxlength: 2 } },
                { name: 'regiao', type: 'text', value: this.definirRegiao(resposta.uf), placeholder: 'Região' },
                { name: 'complemento', type: 'text', value: resposta.complemento || '', placeholder: 'Complemento (opcional)' }
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel'
                },
                {
                  text: 'Salvar',
                  handler: (info) => {
                    const novoEndereco: IColetaAddress = {
                      cep: info.cep,
                      logradouro: info.logradouro,
                      bairro: info.bairro,
                      localidade: info.localidade,
                      uf: info.uf.toUpperCase(),
                      estado: info.uf.toUpperCase(),
                      regiao: info.regiao,
                      complemento: info.complemento,
                      unidade: info.unidade
                    };

                    const duplicado = this.enderecos.some(e =>
                      e.cep === novoEndereco.cep && e.logradouro === novoEndereco.logradouro
                    );

                    if (duplicado) {
                      this.alertCtrl.create({
                        header: 'Endereço duplicado',
                        message: 'Este endereço já está cadastrado.',
                        buttons: ['OK']
                      }).then(a => a.present());
                      return false;
                    }

                    this.coletaService.adicionarEndereco(novoEndereco).subscribe({
                      next: res => {
                        if (res.data) {
                          this.enderecos.push(res.data);
                          this.formulario.patchValue({ enderecoSel: this.enderecos.length - 1 });

                          this.alertCtrl.create({
                            header: 'Sucesso',
                            message: 'Endereço adicionado com sucesso!',
                            buttons: ['OK']
                          }).then(a => a.present());
                        }
                      },
                      error: err => {
                        console.error('Erro ao adicionar endereço', err);
                        this.alertCtrl.create({
                          header: 'Erro',
                          message: 'Erro ao salvar o endereço.',
                          buttons: ['OK']
                        }).then(a => a.present());
                      }
                    });

                    return true;
                  }
                }
              ]
            });

            await enderecoAlert.present();
            return true;

          } catch (erro) {
            console.error('Erro ao buscar CEP:', erro);
            this.alertCtrl.create({
              header: 'Erro',
              message: 'Erro ao buscar o CEP.',
              buttons: ['OK']
            }).then(a => a.present());
            return false;
          }
        }
      }
    ]
  });

  await cepAlert.present();
}


  definirRegiao(uf: string): string {
    const regioes: any = {
      'N': ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
      'NE': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
      'CO': ['GO', 'MT', 'MS', 'DF'],
      'SE': ['ES', 'RJ', 'SP'],
      'S': ['PR', 'RS', 'SC']
    };
    for (const reg in regioes) {
      if (regioes[reg].includes(uf)) return reg;
    }
    return '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagemSelecionada = input.files[0];
      console.log('Imagem selecionada:', this.imagemSelecionada.name);
    }
  }

  async enviarFormulario() {

    if (this.formulario.invalid || !this.imagemSelecionada) {
      this.showToast('Preencha todos os campos obrigatórios e selecione uma imagem.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Enviando solicitação...'
    });
    await loading.present();

    try {
      const formData = new FormData();

      const solicitationObj = {
        type: this.formulario.value.type, // ou this.formulario.value.type
        addressIndex: Number(this.formulario.value.enderecoSel),
        desiredDate: new Date(this.formulario.value.dataServico + ' ' + this.formulario.value.horaServico).getTime(),
        description: this.formulario.value.desc,
        suggestedValue: Number(this.formulario.value.valor)
      };

      formData.append('solicitation', JSON.stringify(solicitationObj));
      formData.append('image', this.imagemSelecionada, this.imagemSelecionada.name);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');

      this.http.post('https://coletaverde.up.railway.app/solicitation/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: res => {
          console.log('Solicitação enviada', res);
          const solicitationId = (res as any)?.data?.id; // ou ajuste conforme a resposta real
          if (solicitationId) {
            this.router.navigate(['/pagamento', solicitationId]);
          } else {
            alert('Solicitação enviada, mas não foi possível obter o ID para pagamento.');
          }
        },
        error: err => {
          console.log('Solicitation:', solicitationObj);
          console.log('Imagem:', this.imagemSelecionada);
          console.error('Erro ao enviar solicitação:', err);
          alert('Erro ao enviar solicitação.');
        }
      });
    } catch (error) {
      console.error('Erro no envio:', error);
      alert('Erro interno ao preparar envio.');
    } finally {
      loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
