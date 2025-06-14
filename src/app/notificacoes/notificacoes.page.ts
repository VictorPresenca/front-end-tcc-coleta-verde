import { Component, OnInit } from '@angular/core';
import { NotificacoesService } from '../services/notificacoes.service';
import { ColetaBackendService, EColetaRole } from '../services/coleta-backend.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.page.html',
  styleUrls: ['./notificacoes.page.scss'],
  standalone: false,
})
export class NotificacoesPage implements OnInit {

  notificacoes: any[] = [];

  constructor(
    private notificacoesService: NotificacoesService,
    private coletaBackendService: ColetaBackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notificacoesService.notificacoes$.subscribe((dados: any[]) => {
      this.notificacoes = dados;
    });
  }

  atualizar() {
    this.notificacoesService.forcarAtualizacao().subscribe();
  }

  async cliqueNotificao() {
    const userResponse = await lastValueFrom(this.coletaBackendService.getCurrentUserData());
    const role = userResponse.data?.role;

    if (role === EColetaRole.enterprise) {
      this.router.navigate(['/pedidos-cliente']);
    } else if (role === EColetaRole.employee) {
      this.router.navigate(['/pedidos-prestador']);
    }
  }


}
