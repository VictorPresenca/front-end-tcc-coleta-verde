import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
=======
{
  path: '',
  redirectTo: 'inicial',
  pathMatch: 'full'
},
>>>>>>> 9fe20a9d7fc0d3b84ec3f46b6a489b0034cfa5ae
  {
    path: 'perfil-prestador',
    loadChildren: () => import('./perfil-prestador/perfil-prestador.module').then(m => m.PerfilPrestadorPageModule)
  },
  {
    path: 'pedidos-cliente',
    loadChildren: () => import('./pedidos-cliente/pedidos-cliente.module').then(m => m.PedidosClientePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-cliente',
    loadChildren: () => import('./cadastro-cliente/cadastro-cliente.module').then( m => m.CadastroClientePageModule)
  },{
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },{
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },{
    path: 'pedido-prestador',
    loadChildren: () => import('./pedido-prestador/pedido-prestador.module').then( m => m.PedidoPrestadorPageModule)
  },
  {
<<<<<<< HEAD
  path: 'pedido-prestador/:id',
  loadChildren: () => import('./pedido-prestador/pedido-prestador.module').then(m => m.PedidoPrestadorPageModule)
  },
  {
=======
>>>>>>> 9fe20a9d7fc0d3b84ec3f46b6a489b0034cfa5ae
    path: 'inicial',
    loadChildren: () => import('./inicial/inicial.module').then( m => m.InicialPageModule)
  },
  {
    path: 'pedidos-prestador',
    loadChildren: () => import('./pedidos-prestador/pedidos-prestador.module').then( m => m.PedidosPrestadorPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'home-cliente',
    loadChildren: () => import('./home-cliente/home-cliente.module').then( m => m.HomeClientePageModule)
  },
  {
    path: 'leilao',
    loadChildren: () => import('./leilao/leilao.module').then( m => m.LeilaoPageModule)
  },
  {
    path: 'solicitacao',
    loadChildren: () => import('./solicitacao/solicitacao.module').then( m => m.SolicitacaoPageModule)
  },
  {
    path: 'cadastro-prestador',
    loadChildren: () => import('./cadastro-prestador/cadastro-prestador.module').then( m => m.CadastroPrestadorPageModule)
  },
  {
    path: 'pedido-cliente',
    loadChildren: () => import('./pedido-cliente/pedido-cliente.module').then( m => m.PedidoClientePageModule)
  },
  {
    path: 'perfil-cliente',
    loadChildren: () => import('./perfil-cliente/perfil-cliente.module').then( m => m.PerfilClientePageModule)
  },
  {
    path: 'navegacao-teste-front',
    loadChildren: () => import('./navegacao-teste-front/navegacao-teste-front.module').then( m => m.NavegacaoTesteFrontPageModule)
  },
  {
    path: 'cardapio',
    loadChildren: () => import('./cardapio/cardapio.module').then( m => m.CardapioPageModule)
  },
  {
    path: 'finalizar-pedido-prestador',
    loadChildren: () => import('./finalizar-pedido-prestador/finalizar-pedido-prestador.module').then( m => m.FinalizarPedidoPrestadorPageModule)
  },
  {
  path: 'home-prestador',
  loadChildren: () => import('./home-prestador/home-prestador.module').then(m => m.Tab1PageModule)
}


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
