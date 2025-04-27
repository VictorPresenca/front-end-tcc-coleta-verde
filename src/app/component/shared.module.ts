import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ToolbarGlobalComponent } from './toolbar-global/toolbar-global.component';

import { FooterGlobalComponent } from './footer-global/footer-global.component';

import { HeaderEnderecoGlobalComponent } from './header-endereco-global/header-endereco-global.component';

@NgModule({
  declarations: [ToolbarGlobalComponent, FooterGlobalComponent, HeaderEnderecoGlobalComponent],
  exports: [ToolbarGlobalComponent, FooterGlobalComponent, HeaderEnderecoGlobalComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {}
