import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcompanhamentoDoServicoPage } from './acompanhamento-do-servico.page';

const routes: Routes = [
  {
    path: '',
    component: AcompanhamentoDoServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcompanhamentoDoServicoPageRoutingModule {}
