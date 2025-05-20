import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { SolicitacaoPageRoutingModule } from './solicitacao-routing.module';

import { SolicitacaoPage } from './solicitacao.page';

import { SharedModule } from '../component/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoPageRoutingModule,
    SharedModule,
      ReactiveFormsModule
  ],
  declarations: [SolicitacaoPage]
})
export class SolicitacaoPageModule {}
