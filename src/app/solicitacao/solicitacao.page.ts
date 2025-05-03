import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  standalone: false,
})
export class SolicitacaoPage implements OnInit {
  enderecos: any[] = [];
  enderecoSelecionadoIndex: number | null = null;
  descricao: string = '';
  valor: number | null = null;
  isSubmitting: boolean = false;
  novoEndereco: any = {};

  constructor(private alertController: AlertController, private http: HttpClient) {}

  ngOnInit() {
    this.carregarEnderecosSalvos();
  }

  carregarEnderecosSalvos() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('https://coletaverde.up.railway.app/address/all', { headers }).subscribe(
      (res: any) => {
        this.enderecos = res.data || [];
      },
      (error) => {
        console.error('Erro ao carregar endereços:', error);
      }
    );
  }

  async abrirAlertaEndereco() {
    const alertElement = await this.alertController.create({
      header: 'Adicionar Endereço',
      inputs: [
        {
          name: 'cep',
          type: 'text',
          placeholder: 'Digite o CEP (ex: 01001-000)',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Buscar',
          handler: (data) => {
            const cep = data.cep.replace(/\D/g, '');
            if (cep.length === 8) {
              this.buscarEnderecoPorCep(cep);
            } else {
              window.alert('CEP inválido.');
            }
          }
        }
      ]
    });

    await alertElement.present();
  }

  buscarEnderecoPorCep(cep: string) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
      (res: any) => {
        if (res.erro) {
          alert('CEP não encontrado.');
          return;
        }

        const regiao = this.definirRegiao(res.uf);

        this.novoEndereco = {
          cep: res.cep,
          logradouro: res.logradouro,
          bairro: res.bairro,
          localidade: res.localidade,
          uf: res.uf,
          estado: res.uf,
          regiao,
          complemento: '',
          unidade: ''
        };

        this.confirmarNovoEndereco();
      },
      () => {
        alert('Erro ao buscar o endereço.');
      }
    );
  }

  definirRegiao(uf: string): string {
    const regioes: any = {
      'Norte': ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
      'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
      'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
      'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
      'Sul': ['PR', 'RS', 'SC']
    };

    for (const regiao in regioes) {
      if (regioes[regiao].includes(uf)) {
        return regiao;
      }
    }
    return '';
  }

  async confirmarNovoEndereco() {
    const alertElement = await this.alertController.create({
      header: 'Confirmar Endereço',
      inputs: [
        { name: 'cep', type: 'text', placeholder: 'CEP', value: this.novoEndereco.cep },
        { name: 'logradouro', type: 'text', placeholder: 'Logradouro', value: this.novoEndereco.logradouro },
        { name: 'bairro', type: 'text', placeholder: 'Bairro', value: this.novoEndereco.bairro },
        { name: 'localidade', type: 'text', placeholder: 'Cidade', value: this.novoEndereco.localidade },
        { name: 'uf', type: 'text', placeholder: 'UF', value: this.novoEndereco.uf },
        { name: 'regiao', type: 'text', placeholder: 'Região', value: this.novoEndereco.regiao },
        { name: 'complemento', type: 'text', placeholder: 'Complemento (opcional)', value: this.novoEndereco.complemento },
        { name: 'unidade', type: 'text', placeholder: 'Unidade (opcional)', value: this.novoEndereco.unidade }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            const enderecoEditado = {
              cep: data.cep.trim(),
              logradouro: data.logradouro.trim(),
              bairro: data.bairro.trim(),
              localidade: data.localidade.trim(),
              uf: data.uf.trim().toUpperCase(),
              regiao: data.regiao.trim(),
              complemento: data.complemento?.trim() || '',
              unidade: data.unidade?.trim() || '',
              estado: data.uf.trim().toUpperCase()
            };

            const existe = this.enderecos.some(e =>
              e.cep === enderecoEditado.cep &&
              e.logradouro === enderecoEditado.logradouro
            );

            if (existe) {
              alert('Este endereço já está registrado.');
            } else {
              this.enderecos.push(enderecoEditado);
              this.enderecoSelecionadoIndex = this.enderecos.length - 1;
            }
          }
        }
      ]
    });

    await alertElement.present();
  }

  fazerSolicitacao() {
    if (this.enderecoSelecionadoIndex === null) {
      alert('Selecione um endereço.');
      return;
    }

    if (!this.descricao || !this.valor) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const endereco = this.enderecos[this.enderecoSelecionadoIndex];
    const dados = {
      ...endereco,
      descricao: this.descricao,
      valor: this.valor
    };

    this.isSubmitting = true;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('https://coletaverde.up.railway.app/address/create', dados, { headers }).subscribe(
      () => {
        this.isSubmitting = false;
        alert('Solicitação enviada com sucesso!');
        this.resetarFormulario();
        this.carregarEnderecosSalvos(); // Atualiza a lista após envio
      },
      (error) => {
        this.isSubmitting = false;
        const msg = error?.error?.message || 'Erro ao enviar solicitação.';
        alert(msg);
      }
    );
  }

  resetarFormulario() {
    this.descricao = '';
    this.valor = null;
    this.enderecoSelecionadoIndex = null;
  }
}
