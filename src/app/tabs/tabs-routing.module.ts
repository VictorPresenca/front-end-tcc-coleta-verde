import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../home-prestador/home-prestador.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../pedidos-cliente/pedidos-cliente.module').then(m => m.PedidosClientePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../perfil-prestador/perfil-prestador.module').then(m => m.PerfilPrestadorPageModule)
      },
      {
        path: 'pedido-prestador',
        loadChildren: () => import('../pedido-prestador/pedido-prestador.module').then( m => m.PedidoPrestadorPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
