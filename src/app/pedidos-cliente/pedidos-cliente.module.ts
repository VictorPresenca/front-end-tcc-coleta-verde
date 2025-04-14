import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosClientePage } from './pedidos-cliente.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PedidosClientePageRoutingModule } from './pedidos-cliente-routing.module';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PedidosClientePageRoutingModule,
    SharedModule
  ],
  declarations: [PedidosClientePage]
})
export class PedidosClientePageModule {}
