import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcompanhamentoDoServicoPageRoutingModule } from './acompanhamento-do-servico-routing.module';

import { AcompanhamentoDoServicoPage } from './acompanhamento-do-servico.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcompanhamentoDoServicoPageRoutingModule,
    SharedModule
  ],
  declarations: [AcompanhamentoDoServicoPage]
})
export class AcompanhamentoDoServicoPageModule {}
