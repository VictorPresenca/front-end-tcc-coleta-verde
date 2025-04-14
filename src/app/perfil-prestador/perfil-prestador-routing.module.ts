import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPrestadorPage } from './perfil-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilPrestadorPage,
  },
  {
    path: 'configuracoes',
    loadChildren: () => import('../configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilPrestadorPageRoutingModule {}
