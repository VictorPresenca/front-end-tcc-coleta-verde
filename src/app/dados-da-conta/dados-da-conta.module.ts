import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // IMPORTAR ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { DadosDaContaPageRoutingModule } from './dados-da-conta-routing.module';

import { DadosDaContaPage } from './dados-da-conta.page';
import { SharedModule } from '../component/shared.module'; // onde deve estar app-toolbar-global

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   // 👈 adicionar aqui
    IonicModule,
    DadosDaContaPageRoutingModule,
    SharedModule
  ],
  declarations: [DadosDaContaPage]
})
export class DadosDaContaPageModule {}
