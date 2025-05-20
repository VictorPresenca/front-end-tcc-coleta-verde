import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ColetaBackendService, IColetaAddress } from '../services/coleta-backend.service';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private loadingCtrl: LoadingController
  ) {
    this.formulario = this.fb.group({
      enderecoSel: [null, Validators.required],
      desc: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      dataServico: ['', Validators.required],
      horaServico: ['', Validators.required],
      // Caso queira usar type, descomente abaixo
      // type: ['residencial', Validators.required]
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

  adicionarEndereco() {
    if (this.enderecoForm.invalid) {
      alert('Preencha todos os campos do endereço corretamente.');
      return;
    }

    const data = this.enderecoForm.value;
    const novoEndereco: IColetaAddress = {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf.toUpperCase(),
      estado: data.uf.toUpperCase(),
      regiao: this.definirRegiao(data.uf.toUpperCase()),
      unidade: ''
    };

    const existe = this.enderecos.some(e => e.cep === novoEndereco.cep && e.logradouro === novoEndereco.logradouro);
    if (existe) {
      alert('Endereço já cadastrado');
      return;
    }

    this.coletaService.adicionarEndereco(novoEndereco).subscribe({
      next: res => {
        alert('Endereço adicionado com sucesso!');
        if (res.data) {
          this.enderecos.push(res.data);
          this.formulario.patchValue({ enderecoSel: this.enderecos.length - 1 });
          this.enderecoForm.reset();
          this.mostrarFormEndereco = false;
        }
      },
      error: err => {
        console.error('Erro ao adicionar endereço', err);
        alert('Erro ao adicionar endereço');
      }
    });
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
    }
  }

  async enviarFormulario() {
    if (this.formulario.invalid || !this.imagemSelecionada) {
      alert('Preencha todos os campos obrigatórios e selecione uma imagem.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Enviando solicitação...'
    });
    await loading.present();

    try {
      const formData = new FormData();

      const solicitationObj = {
        type: 'rubble', // ou this.formulario.value.type
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
          alert('Solicitação enviada com sucesso!');
        },
        error: err => {
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
}
