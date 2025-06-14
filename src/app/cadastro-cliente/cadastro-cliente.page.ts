import { ColetaBackendService, IAuthRegister } from './../services/coleta-backend.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CadastroClientePage implements OnInit {
  logoPath = 'assets/imagens/logo-app-coleta-verde.png';
  backgroundPath = 'assets/imagens/fundo-arvores-removebg-preview.png';
  passwordVisible: boolean = false;
  nomeEmpresa: string = '';
  cnpj: string = '';
  email: string = '';
  senha: string = '';


  formatarCNPJ(event: any) {
    let valor: string = event.target.value || '';
    valor = valor.replace(/[^\d]/g, '');
    valor = valor.replace(
      /(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/,
      (
        match: string,
        p1: string,
        p2?: string,
        p3?: string,
        p4?: string,
        p5?: string
      ): string => {
        let result = p1;
        if (p2) result += '.' + p2;
        if (p3) result += '.' + p3;
        if (p4) result += '/' + p4;
        if (p5) result += '-' + p5;
        return result;
      }
    );

    this.cnpj = valor;
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  }

  validarSenha(senha: string): boolean {
    return senha.length >= 8 && senha.length <= 20;
  }

  permitirSomenteNumeros(event: KeyboardEvent) {
    const charCode = event.charCode || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }


  constructor(
    private coleta: ColetaBackendService,
    private httpClient: HttpClient,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async onSubmit() {
    if (!this.nomeEmpresa) {
      this.showToast('Nome da Empresa é obrigatório');
      return;
    }

    if (!this.cnpj) {
      this.showToast('CNPJ é obrigatório');
      return;
    }

    if (!this.email) {
      this.showToast('E-mail é obrigatório');
      return;
    }

    if (!this.senha) {
      this.showToast('Senha é obrigatória');
      return;
    }

    const emailValido = this.validarEmail(this.email);
    if (!emailValido) {
      this.showToast('E-mail inválido');
      return;
    }

    const senhaValida = this.validarSenha(this.senha);
    if (!senhaValida) {
      this.showToast('A senha deve ter entre 8 e 20 caracteres.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cadastrando...',
      spinner: 'circles',
    });

    await loading.present();

    try {

      const cnpjLimpo = this.cnpj.replace(/[^\d]+/g, '');

      const dadosCadastro: IAuthRegister = {
        name: this.nomeEmpresa,
        email: this.email,
        password: this.senha,
        accountType: 'enterprise',
        cnpj: this.cnpj
      };

      this.coleta.createAccount(dadosCadastro)
        .subscribe(
          (response) => {
            this.showToast('Cadastro realizado com sucesso');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Erro ao enviar dados', error);
            this.showToast('Erro ao cadastrar. Tente novamente.');
          }
        );

    } catch (error: any) {
      console.error('Erro ao cadastrar prestador', error);
      this.showToast(error?.message || 'Erro desconhecido. Por favor, tente novamente.');
    } finally {
      await loading.dismiss();
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

}
