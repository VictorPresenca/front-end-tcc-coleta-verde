import { ColetaBackendService, IAuthRegister } from './../services/coleta-backend.service';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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

  constructor(private coleta: ColetaBackendService, private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    // Remove os caracteres especiais do CNPJ
    const cnpjLimpo = this.cnpj.replace(/[^\d]+/g, '');

    const dadosCadastro: IAuthRegister = {
      name: this.nomeEmpresa,
      email: this.email,
      password: this.senha,
      accountType: 'enterprise',
      cnpj: this.cnpj
    };

    // Verifique os dados no console
    console.log('Dados do Cadastro:', dadosCadastro);

    this.coleta.createAccount(dadosCadastro)
      .subscribe(
        (response) => {
          console.log('Cadastro realizado com sucesso:', response);
          this.router.navigate(['/login']);  
        },
        (error) => {
          console.error('Erro ao enviar dados', error);
          alert('Erro ao cadastrar. Tente novamente.');
        }
      );
  }

}
