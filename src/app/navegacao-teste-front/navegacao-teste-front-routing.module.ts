import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavegacaoTesteFrontPage } from './navegacao-teste-front.page';

const routes: Routes = [
  {
    path: '',
    component: NavegacaoTesteFrontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavegacaoTesteFrontPageRoutingModule {}
