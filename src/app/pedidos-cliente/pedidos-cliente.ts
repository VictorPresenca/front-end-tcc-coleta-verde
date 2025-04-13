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
    path: 'acompanhamento-do-servico',
    loadChildren: () => import('../acompanhamento-do-servico/acompanhamento-do-servico.module').then( m => m.AcompanhamentoDoServicoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
