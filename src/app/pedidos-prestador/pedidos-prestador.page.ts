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
        console.log('Solicitações recebidas:', res.data);
        this.usuarioLogado = res.data!;
        console.log('Usuário logado:', this.usuarioLogado);
        this.coletaService.listarSolicitacoes(1, 10).subscribe({
          next: (res) => {
            this.solicitacoesAceitas = res.data.filter((s: any) =>
              s.accepted === true &&
              s.employeeId === this.usuarioLogado.id
            );

            console.log('Solicitações aceitas filtradas:', this.solicitacoesAceitas);
          }
        });
      }
    });
  }

  // abrirPedido(id: number) {
  //   this.router.navigate(['/finalizar-pedido-prestador', id]);
  // }

}