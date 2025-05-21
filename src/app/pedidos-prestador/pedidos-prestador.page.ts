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
        this.coletaService.listarSolicitacoes(1, 10).subscribe({
          next: (res) => {
            this.solicitacao = res.data;
            const authorId = this.solicitacao.authorId;
            this.solicitacoesAceitas = res.data.filter(
              (s: any) =>
                s.accepted === true && s.employeeId === this.usuarioLogado.id
            );
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
      },
    });
  }

  abrirDetalhes(pedido: any) {
    this.navCtrl.navigateForward(`/finalizar-pedido-prestador/${pedido.id}`);
  }
}
