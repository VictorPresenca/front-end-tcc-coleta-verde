import { Component, OnInit } from '@angular/core';
import {
  ColetaBackendService,
  IColetaUser,
} from 'src/app/services/coleta-backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-prestador',
  templateUrl: './pedidos-prestador.page.html',
  styleUrls: ['./pedidos-prestador.page.scss'],
  standalone: false,
})
export class PedidosPrestadorPage implements OnInit {

  solicitationId!: number;
  solicitacao: any;
  solicitacoesAceitas: any[] = [];
  usuarioLogado!: IColetaUser;
  nomesClientes: { [key: number]: string } = {};

  constructor(
    private coletaService: ColetaBackendService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.carregarUsuarioEColetas();
    this.solicitationId = Number(this.route.snapshot.paramMap.get('id'));
  }

  carregarUsuarioEColetas() {
    this.coletaService.getCurrentUserData().subscribe({
      next: (res) => {
        this.usuarioLogado = res.data!;
        this.listarSolicitacoesAceitas();
      },
    });
  }

  listarSolicitacoesAceitas(){

  this.coletaService.listarSolicitacoes(1, 10).subscribe({
      next: (res) => {
        this.solicitacao = res.data;
        console.log(this.solicitacao);
        const authorId = this.solicitacao.authorId;
        this.solicitacoesAceitas = res.data.filter(
          (s: any) =>
            s.accepted === true && s.employeeId === this.usuarioLogado.id
        );

        //Pegar nome do cliente
        this.solicitacoesAceitas.forEach((s) => {
          if (s.authorId) {
          this.coletaService.getUsuarioPorId(s.authorId).subscribe({
            next: (userRes) => {
              const user = (userRes as any).data;
              this.nomesClientes[s.id] = user.name;
            },
            error: () => {
              this.nomesClientes[s.id] = 'Nome indisponível';
            },
          });
        }
        });
        
      },
    });
  }

  getProgressText(progress: string): string {
    switch (progress) {
      case 'waiting':
        return 'AGUARDANDO';
      case 'accepted':
        return 'ACEITO';
      case 'inProgress':
        return 'EM ANDAMENTO';
      case 'finished':
        return 'CONCLUÍDO';
      case 'expired':
        return 'EXPIRADO';
      case 'canceled':
        return 'CANCELADO';
      case 'paying':
        return 'AGUARDANDO PGTO';
      default:
        return progress.toUpperCase();
    }
  }

  getProgressClass(progress: string): string {
    switch (progress) {
      case 'created':
      case 'accepted':
      case 'inProgress':
        return 'inProgress'; // Cor para status em andamento
      case 'finished':
        return 'finished'; // Cor para status concluído
      case 'canceled':
      case 'expired':
        return 'canceled'; // Cor para status cancelado/expirado
      case 'paying':
        return 'paying'; // Cor para status de pagamento
      default:
        return '';
    }
  }

  abrirDetalhes(pedido: any) {
    if(pedido.progress=='finished'){
      this.navCtrl.navigateForward(`/pedido-prestador/${pedido.id}`);
      return;
    }
    this.navCtrl.navigateForward(`/finalizar-pedido-prestador/${pedido.id}`);
  }
}