import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DadosDaContaPage } from './dados-da-conta.page';

const routes: Routes = [
  {
    path: '',
    component: DadosDaContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosDaContaPageRoutingModule {}
