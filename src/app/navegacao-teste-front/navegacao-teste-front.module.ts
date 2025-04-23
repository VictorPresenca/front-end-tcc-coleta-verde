import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavegacaoTesteFrontPageRoutingModule } from './navegacao-teste-front-routing.module';

import { NavegacaoTesteFrontPage } from './navegacao-teste-front.page';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavegacaoTesteFrontPageRoutingModule,
    SharedModule
  ],
  declarations: [NavegacaoTesteFrontPage]
})
export class NavegacaoTesteFrontPageModule {}
