import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarteiraPrestadorPage } from './carteira-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: CarteiraPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteiraPrestadorPageRoutingModule {}
