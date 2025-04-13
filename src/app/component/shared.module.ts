import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ToolbarGlobalComponent } from './toolbar-global/toolbar-global.component';

@NgModule({
  declarations: [ToolbarGlobalComponent],
  exports: [ToolbarGlobalComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {}
