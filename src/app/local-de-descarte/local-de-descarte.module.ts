import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalDeDescartePageRoutingModule } from './local-de-descarte-routing.module';

import { LocalDeDescartePage } from './local-de-descarte.page';

import { SharedModule } from '../component/shared.module'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalDeDescartePageRoutingModule,
    SharedModule
  ],
  declarations: [LocalDeDescartePage]
})
export class LocalDeDescartePageModule {}
