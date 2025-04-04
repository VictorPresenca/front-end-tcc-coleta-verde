import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeparacaoClientePrestadorPage } from './separacao-cliente-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: SeparacaoClientePrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeparacaoClientePrestadorPageRoutingModule {}
