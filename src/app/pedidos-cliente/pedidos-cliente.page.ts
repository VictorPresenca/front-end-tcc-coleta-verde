import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../component/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService } from '../services/coleta-backend.service';
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

  constructor(private coleta: ColetaBackendService, private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.carregarTodosPedidos();
  }

  carregarTodosPedidos() {

    //AGUARDAR FUNÇÃO PARA MODIFICAR
    this.coleta.listarSolicitacoes(1, 10)
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
