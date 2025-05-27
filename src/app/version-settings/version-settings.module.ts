import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersionSettingsPageRoutingModule } from './version-settings-routing.module';

import { VersionSettingsPage } from './version-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VersionSettingsPageRoutingModule
  ],
  declarations: [VersionSettingsPage]
})
export class VersionSettingsPageModule {}
