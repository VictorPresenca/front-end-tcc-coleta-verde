import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-pedido-prestador',
  templateUrl: './finalizar-pedido-prestador.page.html',
  styleUrls: ['./finalizar-pedido-prestador.page.scss'],
  standalone: false
})
export class FinalizarPedidoPrestadorPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  cancelar() {
    this.navCtrl.navigateRoot('/pedidos-prestador');
  }
}

