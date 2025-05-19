import { Component, OnInit } from '@angular/core';
import * as EventSourcePolyfill from 'event-source-polyfill';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService } from '../services/coleta-backend.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {
  serverURL = 'https://coletaverde.up.railway.app';
  jwt: string = this.coleta.getToken;
  currentUser: any = null;
  userCache = new Map<number, string>();
  chatMessages: any[] = [];
  toUserId: number | null = null;
  mensagem: string = '';

  constructor(private coleta: ColetaBackendService, private http: HttpClient) {
    if (typeof window !== 'undefined' && typeof window.EventSource === 'undefined') {
      window.EventSource = EventSourcePolyfill as any;
    }
  }

  ngOnInit() {
    const jwt = this.coleta.getToken;
    console.log('Token:', jwt);
    this.fetchCurrentUser();
    this.initializeEventSource();
  }

  async fetchCurrentUser() {
    try {
      const res = await fetch(this.serverURL + "/user/me", {
        headers: { 'Authorization': 'Bearer ' + this.jwt }
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      this.currentUser = json.data;
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao obter usuário: " + error.message);
      } else {
        alert("Erro desconhecido");
      }
    }
  }



  async sendMessage() {
    const text = this.mensagem.trim();
    if (!text || !this.toUserId || !this.currentUser) return;
    try {
      await fetch(this.serverURL + '/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwt
        },
        body: JSON.stringify({ to: this.toUserId, message: text })
      });
      this.chatMessages.push({ authorId: this.currentUser.id, text, sentAt: Date.now() });
      this.mensagem = '';  // Limpa o campo de mensagem após enviar
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao enviar mensagem: " + error.message);
      } else {
        alert("Erro desconhecido");
      }
    }
  }

  initializeEventSource() {
    const stream = new EventSource(`${this.serverURL}/sse/chat?token=${encodeURIComponent(this.jwt)}`);

    stream.onmessage = async (message) => {
      try {
        let event = JSON.parse(message.data);
        if (event.type === "new message") {
          if (!this.toUserId) {
            this.toUserId = event.data.authorId;
          }
          this.chatMessages.push(event.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          alert("Erro ao processar mensagem SSE: " + error.message);
        } else {
          alert("Erro desconhecido ao processar mensagem SSE.");
        }
      }
    };
  }
}
