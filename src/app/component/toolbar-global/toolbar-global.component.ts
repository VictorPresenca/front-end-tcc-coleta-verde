import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-toolbar-global',
  templateUrl: './toolbar-global.component.html',
  styleUrls: ['./toolbar-global.component.scss'],
  standalone: false,
})
export class ToolbarGlobalComponent  implements OnInit, OnDestroy {

  qtdNovasSolicitacoes = 0;
  private subscription!: Subscription;

  constructor(private solicitacaoService: SolicitacaoService) { }

  ngOnInit() {
    this.subscription = this.solicitacaoService.solicitacoes$.subscribe(solicitacoes => {
      this.qtdNovasSolicitacoes = solicitacoes.length;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Input() titulo: string = 'Título'; // Personalizável por página
  @Input() mostrarBotaoVoltar: boolean = true;

  abrirNotificacoes() {
    // Coloque aqui a lógica para abrir as notificações
    console.log('Notificações abertas!');
  }

}
