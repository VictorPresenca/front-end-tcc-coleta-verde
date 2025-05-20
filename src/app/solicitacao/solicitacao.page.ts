import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ColetaBackendService } from '../services/coleta-backend.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  standalone: false
})
export class SolicitacaoPage implements OnInit {

  listaEnderecos: any[] = [];
  enderecoSelecionado: number = -1;
  descricao: string = '';
  valorSugerido: number | null = null;
  dataSelecionada: string = '';
  horaSelecionada: string = '';
  imagemSelecionada: File | null = null;

  isSubmitting: boolean = false;

  constructor(private coletaService: ColetaBackendService) {}

  ngOnInit() {
    this.carregarEnderecos();
  }

  carregarEnderecos() {
    this.coletaService.listarEndereco().subscribe({
  next: (response) => {
    if(response.status === 200 && response.data){
      this.listaEnderecos = response.data; // Ajuste dependendo do formato do retorno
    } else {
      alert(response.message || 'Falha ao carregar endereços');
    }
  },
  error: (err) => {
    console.error(err);
    alert('Erro ao buscar endereços no servidor');
  }
});
}

  onImagemSelecionada(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.imagemSelecionada = target.files[0];
    }
  }

  abrirModalEndereco() {
    // Coloque aqui a lógica para abrir um modal de cadastro de endereço
    alert('Abrir modal para adicionar novo endereço');
  }

  compareWithIndex(i1: number, i2: number): boolean {
    return i1 === i2;
  }
fazerSolicitacao(form: NgForm) {
  if (
    this.enderecoSelecionado === -1 ||
    !this.descricao ||
    !this.valorSugerido ||
    !this.dataSelecionada ||
    !this.horaSelecionada
  ) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  this.isSubmitting = true;
  console.log('Iniciando solicitação...');

  if (!this.imagemSelecionada) {
    alert('Selecione uma imagem.');
    this.isSubmitting = false;
    return;
  }

  console.log('Dados da solicitação:', {
    enderecoSelecionado: this.enderecoSelecionado,
    descricao: this.descricao,
    valorSugerido: this.valorSugerido,
    dataSelecionada: this.dataSelecionada,
    horaSelecionada: this.horaSelecionada,
    imagemSelecionada: this.imagemSelecionada.name
  });

  this.coletaService.fazerSolicitacao(
    this.enderecoSelecionado,
    this.descricao,
    this.valorSugerido,
    this.dataSelecionada,
    this.horaSelecionada,
    this.imagemSelecionada
  ).subscribe({
    next: (response) => {
      console.log('Resposta do backend:', response);
      alert('Solicitação enviada com sucesso!');
      form.resetForm();
      this.imagemSelecionada = null;
      this.enderecoSelecionado = -1;
      this.isSubmitting = false;
    },
    error: (error) => {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar a solicitação.');
      this.isSubmitting = false;
    }
  });
}


}
