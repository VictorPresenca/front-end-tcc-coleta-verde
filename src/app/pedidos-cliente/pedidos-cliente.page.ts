import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../component/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService, IColetaUser } from '../services/coleta-backend.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.page.html',
  styleUrls: ['./pedidos-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, SharedModule, RouterModule]
})
export class PedidosClientePage implements OnInit {

  solicitacoes: any[] = [];
  usuarioLogado!: IColetaUser;

  constructor(private coleta: ColetaBackendService, private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.coleta.getCurrentUserData().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.usuarioLogado = res.data;
          this.carregarTodosPedidos();
        } else {
          console.error('Dados do usuário não encontrados.');
        }
      },
      error: (err) => {
        console.error('Erro ao obter usuário logado', err);
      }
    });
  }


  carregarTodosPedidos() {
    this.coleta.listarPedidosCliente(this.usuarioLogado.id)
      .subscribe(
        (res: any) => {
          this.solicitacoes = res.data.filter((s: any) => s.progress === 'created');
        },
        (err: any) => {
          console.error('Erro ao carregar solicitações', err);
        }
      );
  }

  // abrirDetalhes(item: any){
  //   console.log('Item clicado:', item);
  //   this.navCtrl.navigateForward(`/pedido-prestador/${item.id}`);
  // }

}
