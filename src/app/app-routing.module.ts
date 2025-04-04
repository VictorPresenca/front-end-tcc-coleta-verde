import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },{
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },{
    path: 'configuracoes',
    loadChildren: () => import('./configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
  },{
    path: 'acompanhamento-do-servico',
    loadChildren: () => import('./acompanhamento-do-servico/acompanhamento-do-servico.module').then( m => m.AcompanhamentoDoServicoPageModule)
  },
  {
    path: 'separacao-cliente-prestador',
    loadChildren: () => import('./separacao-cliente-prestador/separacao-cliente-prestador.module').then( m => m.SeparacaoClientePrestadorPageModule)
  },
  {
    path: 'gerenciamento-de-solicitacoes',
    loadChildren: () => import('./gerenciamento-de-solicitacoes/gerenciamento-de-solicitacoes.module').then( m => m.GerenciamentoDeSolicitacoesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
