import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, IColetaUser } from 'src/app/services/coleta-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos-prestador',
  templateUrl: './pedidos-prestador.page.html',
  styleUrls: ['./pedidos-prestador.page.scss'],
  standalone: false,
})
export class PedidosPrestadorPage implements OnInit {

  solicitacoesAceitas: any[] = [];
  usuarioLogado!: IColetaUser;

  constructor(
    private coletaService: ColetaBackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarUsuarioEColetas();
  }

  carregarUsuarioEColetas() {
    this.coletaService.getCurrentUserData().subscribe({
      next: (res) => {
        this.usuarioLogado = res.data!;
        this.coletaService.listarSolicitacoes(1, 100).subscribe({
          next: (res) => {
            this.solicitacoesAceitas = res.data.filter((s: any) =>
              s.progress === 'accepted' &&
              s.employeeId === this.usuarioLogado.id
            );
          }
        });
      }
    });
  }

  abrirPedido(id: number) {
    this.router.navigate(['/pedido-prestador', id]);
  }

}
