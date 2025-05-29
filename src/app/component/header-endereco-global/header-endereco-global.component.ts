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
      this.qtdNovasNotificacoes = notificacoes.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Input() endereco: string = 'Título'; // Personalizável por página
  @Input() mostrarBotaoVoltar: boolean = true;

  abrirNotificacoes() {
    this.router.navigate(['/notificacoes']);
  }

}
