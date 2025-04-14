import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosPrestadorPageRoutingModule } from './pedidos-prestador-routing.module';

import { PedidosPrestadorPage } from './pedidos-prestador.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPrestadorPageRoutingModule,
    SharedModule
  ],
  declarations: [PedidosPrestadorPage]
})
export class PedidosPrestadorPageModule {}
