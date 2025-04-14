import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPrestadorPage } from './pedido-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPrestadorPageRoutingModule {}
