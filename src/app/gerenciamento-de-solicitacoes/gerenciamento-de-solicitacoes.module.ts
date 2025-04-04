import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciamentoDeSolicitacoesPageRoutingModule } from './gerenciamento-de-solicitacoes-routing.module';

import { GerenciamentoDeSolicitacoesPage } from './gerenciamento-de-solicitacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciamentoDeSolicitacoesPageRoutingModule
  ],
  declarations: [GerenciamentoDeSolicitacoesPage]
})
export class GerenciamentoDeSolicitacoesPageModule {}
