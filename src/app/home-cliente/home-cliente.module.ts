import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClientePageRoutingModule } from './home-cliente-routing.module';
import { HomeClientePage } from './home-cliente.page';

import { SharedModule } from '../component/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClientePageRoutingModule,
    SharedModule,
  ],
  declarations: [HomeClientePage]
})
export class HomeClientePageModule {}
