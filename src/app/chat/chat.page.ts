import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {

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
