import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalDeDescartePageRoutingModule } from './local-de-descarte-routing.module';

import { LocalDeDescartePage } from './local-de-descarte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalDeDescartePageRoutingModule
  ],
  declarations: [LocalDeDescartePage]
})
export class LocalDeDescartePageModule {}
