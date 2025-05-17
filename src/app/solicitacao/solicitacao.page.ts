import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService } from 'src/app/services/coleta-backend.service';

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
  dataSelecionada: string = '';
  horaSelecionada: string = '';
  isSubmitting: boolean = false;
  novoEndereco: any = {};

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private coletaBackendService: ColetaBackendService
  ) {}

  ngOnInit() {
    this.carregarEnderecosSalvos();
  }

  carregarEnderecosSalvos() {
    const token = localStorage.getItem('token');
    if (!token) return console.error('Token não encontrado.');

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get('https://coletaverde.up.railway.app/address/all', { headers }).subscribe(
      (res: any) => this.enderecos = res.data || [],
      (err) => console.error('Erro ao carregar endereços:', err)
    );
  }

  async abrirAlertaEndereco() {
    const alertElement = await this.alertController.create({
      header: 'Adicionar Endereço',
      inputs: [{ name: 'cep', type: 'text', placeholder: 'Digite o CEP (ex: 01001-000)' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Buscar',
          handler: (data) => {
            const cep = data.cep.replace(/\D/g, '');
            if (cep.length === 8) this.buscarEnderecoPorCep(cep);
            else alert('CEP inválido.');
          }
        }
      ]
    });

    await alertElement.present();
  }

  buscarEnderecoPorCep(cep: string) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
      (res: any) => {
        if (res.erro) return alert('CEP não encontrado.');
        const regiao = this.definirRegiao(res.uf);
        this.novoEndereco = {
          cep: res.cep, logradouro: res.logradouro, bairro: res.bairro,
          localidade: res.localidade, uf: res.uf, estado: res.uf, regiao,
          complemento: '', unidade: ''
        };
        this.confirmarNovoEndereco();
      },
      () => alert('Erro ao buscar o endereço.')
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
      if (regioes[regiao].includes(uf)) return regiao;
    }
    return '';
  }

  async confirmarNovoEndereco() {
    const alertElement = await this.alertController.create({
      header: 'Confirmar Endereço',
      inputs: [
        { name: 'cep', value: this.novoEndereco.cep, type: 'text', placeholder: 'CEP' },
        { name: 'logradouro', value: this.novoEndereco.logradouro, type: 'text', placeholder: 'Logradouro' },
        { name: 'bairro', value: this.novoEndereco.bairro, type: 'text', placeholder: 'Bairro' },
        { name: 'localidade', value: this.novoEndereco.localidade, type: 'text', placeholder: 'Cidade' },
        { name: 'uf', value: this.novoEndereco.uf, type: 'text', placeholder: 'UF' },
        { name: 'regiao', value: this.novoEndereco.regiao, type: 'text', placeholder: 'Região' },
        { name: 'complemento', value: '', type: 'text', placeholder: 'Complemento' },
        { name: 'unidade', value: '', type: 'text', placeholder: 'Unidade' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            const enderecoEditado = {
              ...data,
              estado: data.uf.toUpperCase(),
              uf: data.uf.toUpperCase()
            };

            const existe = this.enderecos.some(e =>
              e.cep === enderecoEditado.cep && e.logradouro === enderecoEditado.logradouro
            );

            if (existe) alert('Este endereço já está registrado.');
            else {
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
    if (this.enderecoSelecionadoIndex === null) return alert('Selecione um endereço.');
    if (!this.descricao || !this.valor || !this.dataSelecionada || !this.horaSelecionada)
      return alert('Preencha todos os campos obrigatórios.');

    this.isSubmitting = true;

    this.coletaBackendService.fazerSolicitacaoColeta(
      this.enderecoSelecionadoIndex,
      this.descricao,
      this.valor,
      this.dataSelecionada,
      this.horaSelecionada
    ).subscribe(
      () => {
        this.isSubmitting = false;
        alert('Solicitação enviada com sucesso!');
        this.resetarFormulario();
        this.carregarEnderecosSalvos();
      },
      (err) => {
        this.isSubmitting = false;
        alert(err?.error?.message || 'Erro ao enviar solicitação.');
      }
    );
  }

  resetarFormulario() {
    this.descricao = '';
    this.valor = null;
    this.enderecoSelecionadoIndex = null;
    this.dataSelecionada = '';
    this.horaSelecionada = '';
  }
}
