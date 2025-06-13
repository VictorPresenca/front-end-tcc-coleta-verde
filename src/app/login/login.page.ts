import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ColetaBackendService, EColetaRole } from '../services/coleta-backend.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs'; // Importação do lastValueFrom

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
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async submitLogin() {
    if (!this.email || !this.password) {
      this.showToast('Por favor, preencha todos os campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'circles',
    });

    await loading.present();

    try {
      // Usando lastValueFrom para resolver o Observable em Promise
      const jwtResponse = await lastValueFrom(this.coletaBackendService.getJwtByCredentials(this.email, this.password));

      if (!jwtResponse.data) {
        this.showToast('Token inválido ou ausente.');
        await loading.dismiss();
        return;
      }

      this.coletaBackendService.setToken = jwtResponse.data;

      const userResponse = await lastValueFrom(this.coletaBackendService.getCurrentUserData());
      const role = userResponse.data?.role;

      if (role === EColetaRole.enterprise) {
        this.router.navigate(['/home-cliente']);
      } else if (role === EColetaRole.employee) {
        this.router.navigate(['/home-prestador']);
        this.coletaBackendService.setToken = jwtResponse.data;
      } else {
        this.showToast('Apenas empresas e funcionários podem acessar.');
      }
    } catch (error: any) {
      this.showToast(error?.message || 'Erro desconhecido. Por favor, tente novamente.');
    } finally {
      await loading.dismiss();
    }
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

  esqueciSenha() {
    alert("Ops! A opção de redefinir a senha está desativada. Entre em contato com o administrador do site para obter ajuda.");
  }
}
