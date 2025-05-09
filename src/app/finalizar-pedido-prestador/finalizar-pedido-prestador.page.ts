import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finalizar-pedido-prestador',
  templateUrl: './finalizar-pedido-prestador.page.html',
  styleUrls: ['./finalizar-pedido-prestador.page.scss'],
  standalone: false
})
export class FinalizarPedidoPrestadorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registrarFinalizacao() {
    const horario = new Date().toLocaleString('pt-BR');
    const avaliacao = (document.getElementById('avaliacao') as HTMLSelectElement).value;
  
    let mensagem = 'Coleta finalizada com sucesso!\nHorário de finalização: ' + horario;
    if (avaliacao) {
      mensagem += '\nAvaliação do cliente: ' + avaliacao + ' estrela(s)';
    }
    alert(mensagem);
  }

}
