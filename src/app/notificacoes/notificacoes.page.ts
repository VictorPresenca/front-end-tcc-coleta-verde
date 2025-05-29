import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from '../services/notificacoes.service';


@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
  standalone: false,
})
export class NotificacoesPage implements OnInit {

  notificacoes: any[] = [];

  constructor(private notificacoesService: NotificacoesService) { }

  ngOnInit() {
    this.notificacoesService.notificacoes$.subscribe((dados: any[]) => {
      this.notificacoes = dados;
    });
  }

  atualizar() {
    this.notificacoesService.forcarAtualizacao().subscribe();
  }

}
