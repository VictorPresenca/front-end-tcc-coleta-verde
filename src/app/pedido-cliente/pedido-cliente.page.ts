import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColetaBackendService } from '../services/coleta-backend.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
  standalone: false,
})
export class PedidoClientePage implements OnInit {

  solicitationId!: number;
  solicitacao: any;
  nomeCliente: string = '...';
  constructor(
    private route: ActivatedRoute,
    private coletaService: ColetaBackendService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarSolicitacao();
  }
  buscarSolicitacao() {
    this.coletaService.buscarSolicitacaoPorId(this.solicitationId).subscribe({
      next: (res) => {
        this.solicitacao = res.data;

        const authorId = this.solicitacao.authorId;
      if (authorId) {
        this.coletaService.getUsuarioPorId(authorId).subscribe({
          next: (userRes) => {
            const user = (userRes as any).data;
            this.nomeCliente = user.name;
          },
          error: () => {
            this.nomeCliente = 'Nome indisponível';
          }
        });
      }
      },
      error: () => {
        this.showErro('Erro ao carregar os detalhes do pedido');
      }
    });
  }
  async showErro(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
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
}
