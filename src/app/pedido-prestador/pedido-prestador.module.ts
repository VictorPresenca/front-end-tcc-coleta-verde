import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidoPrestadorPageRoutingModule } from './pedido-prestador-routing.module';

import { PedidoPrestadorPage } from './pedido-prestador.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidoPrestadorPageRoutingModule,
    SharedModule
  ],
  declarations: [PedidoPrestadorPage]
})
export class PedidoPrestadorPageModule {}
