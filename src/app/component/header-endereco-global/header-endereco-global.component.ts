import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificacoesService } from '../../services/notificacoes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-endereco-global',
  templateUrl: './header-endereco-global.component.html',
  styleUrls: ['./header-endereco-global.component.scss'],
  standalone: false,
})
export class HeaderEnderecoGlobalComponent  implements OnInit, OnDestroy {
  qtdNovasNotificacoes = 0;
  private subscription!: Subscription;

  constructor(private notificacoesService: NotificacoesService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.notificacoesService.notificacoes$.subscribe(notificacoes => {
      const notificacoesVistas = localStorage.getItem('notificacoesVistas') === 'true';

      if (!notificacoesVistas && notificacoes.length > 0) {
        this.qtdNovasNotificacoes = notificacoes.length;
      } else {
        this.qtdNovasNotificacoes = 0;
      }

      if (notificacoes.length > 0) {
        localStorage.setItem('notificacoesVistas', 'false');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Input() endereco: string = 'Título'; // Personalizável por página
  @Input() mostrarBotaoVoltar: boolean = true;

  abrirNotificacoes() {
    const notificacoesAntes = this.qtdNovasNotificacoes;

    if (notificacoesAntes > 0) {
      this.qtdNovasNotificacoes = 0;
      this.notificacoesService.marcarTodasComoLidas();
      localStorage.setItem('notificacoesVistas', 'true');
    }

    this.router.navigate(['/notificacoes']);
  }

  


}
