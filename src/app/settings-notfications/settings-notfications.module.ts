import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsNotficationsPageRoutingModule } from './settings-notfications-routing.module';

import { SettingsNotficationsPage } from './settings-notfications.page';

import { SharedModule } from '../component/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsNotficationsPageRoutingModule,
    SharedModule,

  ],
  declarations: [SettingsNotficationsPage]

})
export class SettingsNotficationsPageModule {}
