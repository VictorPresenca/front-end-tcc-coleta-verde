import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../component/shared.module';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ColetaBackendService, IColetaUser, IColetaBackendResponse } from '../services/coleta-backend.service';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.page.html',
  styleUrls: ['./pedidos-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, SharedModule, RouterModule]
})
export class PedidosClientePage implements OnInit {

  solicitacoesCliente: any[] = [];
  usuarioLogado!: IColetaUser;
  nomesPrestadores: { [key: number]: string } = {};

  constructor(
    private coletaService: ColetaBackendService,
    private http: HttpClient,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarUsuarioEColetas();
  }

  carregarUsuarioEColetas() {
    this.coletaService.getCurrentUserData().subscribe({
      next: (res: IColetaBackendResponse<IColetaUser>) => {
        if (res.data) {
          this.usuarioLogado = res.data;
          this.listarSolicitacoesDoCliente();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }

  listarSolicitacoesDoCliente() {
    this.coletaService.listarSolicitacoes(1, 10).subscribe({
      next: (res) => {
        // Filtrar as solicitações onde o autor é o usuário logado
        this.solicitacoesCliente = res.data.filter(
          (s: any) => s.authorId === this.usuarioLogado.id
        );

        // Pegar nome do prestador para cada solicitação aceita
        this.solicitacoesCliente.forEach((s) => {
          if (s.employeeId) { // Verifica se há um prestador atribuído
            this.coletaService.getUsuarioPorId(s.employeeId).subscribe({
              next: (userRes) => {
                const user = (userRes as any).data;
                this.nomesPrestadores[s.id] = user.name;
              },
              error: () => {
                this.nomesPrestadores[s.id] = 'Prestador indisponível';
              },
            });
          } else {
            this.nomesPrestadores[s.id] = 'Aguardando prestador';
          }
        });
      },
      error: (err) => {
        console.error('Erro ao listar solicitações:', err);
      }
    });
  }

  abrirDetalhes(pedido: any) {
    this.navCtrl.navigateForward(`/pedido-cliente/${pedido.id}`);
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

  getProgressText(progress: string): string {
    switch (progress) {
      case 'created':
        return 'CRIADO';
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