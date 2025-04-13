import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoPageRoutingModule } from './pagamento-routing.module';

import { PagamentoPage } from './pagamento.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoPageRoutingModule,
    SharedModule
  ],
  declarations: [PagamentoPage]
})
export class PagamentoPageModule {}
