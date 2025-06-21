import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalDeDescartePage } from './local-de-descarte.page';

const routes: Routes = [
  {
    path: '',
    component: LocalDeDescartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalDeDescartePageRoutingModule {}
