import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarteiraPrestadorPageRoutingModule } from './carteira-prestador-routing.module';

import { CarteiraPrestadorPage } from './carteira-prestador.page';
import { SharedModule } from '../component/shared.module'; // onde deve estar app-toolbar-global

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarteiraPrestadorPageRoutingModule,
    SharedModule
  ],
  declarations: [CarteiraPrestadorPage]
})
export class CarteiraPrestadorPageModule {}
