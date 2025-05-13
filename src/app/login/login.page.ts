import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  ColetaBackendService,
  EColetaRole,
} from '../services/coleta-backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  passwordVisible: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private coletaBackendService: ColetaBackendService,
    private toastController: ToastController
  ) {}

  submitLogin() {
    this.coletaBackendService
      .getJwtByCredentials(this.email, this.password)
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.coletaBackendService.setToken = res.data;
          } else {
            this.showToast('Token inválido ou ausente.');
          }

          // Após o login, buscar os dados do usuário para verificar o tipo da conta
          this.coletaBackendService.getCurrentUserData().subscribe({
            next: (resUser) => {
              const role = resUser.data?.role;

              if (role === EColetaRole.enterprise) {
                console.log('Redirecionando para empresa');
                this.router.navigate(['/home-cliete']);
              } else if (role === EColetaRole.employee) {
                console.log('Redirecionando para funcionário');
                this.router.navigate(['/']);
              } else {
                console.log('Outro tipo de conta:', role);
                this.showToast('Apenas empresas e funcionários podem acessar.');
              }
            },
            error: () => {
              this.showToast('Erro ao buscar dados do usuário.');
            },
          });
        },
        error: async ({ error }) => {
          this.showToast(error.message);
        },
      });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
