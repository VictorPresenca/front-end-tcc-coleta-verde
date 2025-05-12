import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ColetaBackendService } from '../services/coleta-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class LoginPage {

  passwordVisible: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private coletaBackendService: ColetaBackendService, private toastController: ToastController) {}

  submitLogin() {

    const loginData = this.coletaBackendService.getJwtByCredentials(this.email, this.password);
    loginData.subscribe({
      next: (value: any) => {
        
        this.coletaBackendService.setToken = value.data;
        console.log(this.coletaBackendService.getToken);
      },
      error: async ({ error }) => {
        let toast = await this.toastController.create({
          message: error.message,
          duration: 2000
        });
        toast.present();
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
