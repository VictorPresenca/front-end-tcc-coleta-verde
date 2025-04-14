import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPrestadorPage } from './pedidos-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPrestadorPageRoutingModule {}
