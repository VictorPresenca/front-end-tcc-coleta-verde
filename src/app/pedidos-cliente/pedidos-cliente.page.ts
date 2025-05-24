import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../component/shared.module';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService, IColetaUser, IColetaBackendResponse } from '../services/coleta-backend.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.page.html',
  styleUrls: ['./pedidos-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, SharedModule, RouterModule]
})
export class PedidosClientePage implements OnInit {

  solicitacoesAceitas: any[] = [];
  usuarioLogado!: IColetaUser;

  constructor(
    private coleta: ColetaBackendService, // Usando 'coleta' corretamente
    private http: HttpClient,
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarUsuarioEColetas();
  }

  // Carrega dados do usuário e as coletas aceitas
  carregarUsuarioEColetas() {
    this.coleta.getCurrentUserData().subscribe({
      next: (res: IColetaBackendResponse<IColetaUser>) => {  // Tipagem explícita para resposta do usuário
        if (res.data) {
          this.usuarioLogado = res.data;
          this.listarSolicitacoesAceitas();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
        // Pode adicionar uma notificação de erro aqui
      }
    });
  }

  // Lista as solicitações aceitas
  listarSolicitacoesAceitas() {
    this.coleta.listarSolicitacoes(1, 5).subscribe({
      next: (res) => {
        this.solicitacoesAceitas = res.data || [];
      },
      error: (err) => {
        console.error('Erro ao listar solicitações:', err);
      }
    });
  }

  // Abre um pedido específico
  abrirPedido(id: number) {
    this.router.navigate(['/pedido-cliente', id]);
  }
}