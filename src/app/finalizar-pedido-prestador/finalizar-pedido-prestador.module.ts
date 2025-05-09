import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizarPedidoPrestadorPageRoutingModule } from './finalizar-pedido-prestador-routing.module';

import { FinalizarPedidoPrestadorPage } from './finalizar-pedido-prestador.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizarPedidoPrestadorPageRoutingModule,
    SharedModule
  ],
  declarations: [FinalizarPedidoPrestadorPage]
})
export class FinalizarPedidoPrestadorPageModule {}
