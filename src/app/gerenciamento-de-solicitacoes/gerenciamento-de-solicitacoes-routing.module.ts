import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciamentoDeSolicitacoesPage } from './gerenciamento-de-solicitacoes.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciamentoDeSolicitacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciamentoDeSolicitacoesPageRoutingModule {}
