import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module'; // Mantém o nome da rota
import { LoginPage } from './login.page';           // Importação do componente de Login

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    // Você pode precisar importar LoginPage aqui se outros componentes
    // dentro deste módulo (que NÃO são standalone) o utilizarem.
    // Ex: RouterModule.forChild([{ path: '', component: LoginPage }])
  ],
  declarations: [], // LoginPage removido daqui (se for standalone)
  // Se LoginPage for usado em outros componentes deste módulo,
  // você pode precisar adicioná-lo aos exports também.
  // exports: [LoginPage]
})
export class LoginPageModule {}
