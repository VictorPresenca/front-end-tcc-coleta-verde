import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './pedidos-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
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
export class Tab2PageRoutingModule {}
