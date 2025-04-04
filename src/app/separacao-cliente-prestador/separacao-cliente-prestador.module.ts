import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeparacaoClientePrestadorPageRoutingModule } from './separacao-cliente-prestador-routing.module';

import { SeparacaoClientePrestadorPage } from './separacao-cliente-prestador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeparacaoClientePrestadorPageRoutingModule
  ],
  declarations: [SeparacaoClientePrestadorPage]
})
export class SeparacaoClientePrestadorPageModule {}
