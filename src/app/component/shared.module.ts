import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ToolbarGlobalComponent } from './toolbar-global/toolbar-global.component';

import { FooterGlobalComponent } from './footer-global/footer-global.component';


@NgModule({
  declarations: [ToolbarGlobalComponent, FooterGlobalComponent],
  exports: [ToolbarGlobalComponent, FooterGlobalComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {}
