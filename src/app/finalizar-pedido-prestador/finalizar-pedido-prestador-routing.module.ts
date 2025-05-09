import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizarPedidoPrestadorPage } from './finalizar-pedido-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizarPedidoPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizarPedidoPrestadorPageRoutingModule {}
