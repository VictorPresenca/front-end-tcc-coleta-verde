import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosClientePage } from './pedidos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosClientePage,
  },
  {
    path: 'chat',
    loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'pedido-prestador',
    loadChildren: () => import('../pedido-prestador/pedido-prestador.module').then( m => m.PedidoPrestadorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosClientePageRoutingModule {}
