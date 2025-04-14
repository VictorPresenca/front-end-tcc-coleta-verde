import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilPrestadorPage } from './perfil-prestador.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PerfilPrestadorPageRoutingModule } from './perfil-prestador-routing.module';

import { SharedModule } from '../component/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PerfilPrestadorPageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilPrestadorPage]
})
export class PerfilPrestadorPageModule {}
