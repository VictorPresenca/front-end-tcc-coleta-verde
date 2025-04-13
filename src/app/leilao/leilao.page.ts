import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leilao',
  templateUrl: './leilao.page.html',
  styleUrls: ['./leilao.page.scss'],
  standalone: false,
})
export class LeilaoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mensagem: string = '';

  enviarMensagem() {
    if (this.mensagem.trim()) {
      console.log('Mensagem enviada:', this.mensagem);
      this.mensagem = '';
    }
  }


}
