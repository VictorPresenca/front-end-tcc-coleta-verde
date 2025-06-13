import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.page.html',
  styleUrls: ['./cadastro-prestador.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})

export class CadastroPrestadorPage implements OnInit {

  logoPath = 'assets/imagens/logo-app-coleta-verde.png';
  passwordVisible: boolean = false;

  nomeCompleto: string = '';
  cpf: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';


  formatarCpf(event: any) {
    let valor: string = event.target.value || '';

    valor = valor.replace(/[^\d]/g, '');

    valor = valor.replace(
      /(\d{3})(\d{3})?(\d{3})?(\d{2})?/,
      (
        match: string,
        p1: string,
        p2?: string,
        p3?: string,
        p4?: string
      ): string => {
        let result = p1;
        if (p2) result += '.' + p2;
        if (p3) result += '.' + p3;
        if (p4) result += '-' + p4;
        return result;
      }
    );

    this.cpf = valor;
  }

  formatarTelefone(event: any) {
    let valor: string = event.target.value || '';

    valor = valor.replace(/\D/g, '');

    valor = valor.replace(
      /(\d{0,2})(\d{0,5})(\d{0,4})/,
      (
        match: string,
        ddd: string,
        parte1: string,
        parte2: string
      ): string => {
        let resultado = '';
        if (ddd) {
          resultado += '(' + ddd;
          if (ddd.length === 2) resultado += ') ';
        }
        if (parte1) {
          resultado += parte1;
          if (parte1.length === 5 || (parte1.length === 4 && valor.length < 11)) {
            resultado += '-';
          }
        }
        if (parte2) resultado += parte2;
        return resultado;
      }
    );

    this.telefone = valor;
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


  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (!this.nomeCompleto) {
      alert('Nome Completo é obrigatório');
      return;
    }

    if (!this.cpf) {
      alert('CPF é obrigatório');
      return;
    }

    if (!this.email) {
      alert('E-mail é obrigatório');
      return;
    }

    if (!this.telefone) {
      alert('Telefone é obrigatório');
      return;
    }

    if (!this.senha) {
      alert('Senha é obrigatório');
      return;
    }

    const emailValido = this.validarEmail(this.email);
    if (!emailValido) {
      alert('E-mail inválido');
      return;
    }

    const senhaValida = this.validarSenha(this.senha);
    if (!senhaValida) {
      alert('A senha deve ter entre 8 e 20 caracteres.');
      return;
    }

    const dadosCadastro = {
      name: this.nomeCompleto,
      cpf: this.cpf,
      email: this.email,
      //telefone: this.telefone,
      password: this.senha,
      accountType: 'employee'
    };

    console.log('enviando cadastro do prestador', dadosCadastro);

    this.httpClient.post('https://coletaverde.up.railway.app/auth/register', dadosCadastro)
      .subscribe(
        (response) => {
          console.log('Cadastro prestador realizado com sucesso', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Erro ao cadastrar prestador', error);
          alert('Erro ao cadastrar prestador. Provavelmente os campos de preenchimento estão errados');
        }
      );

  }
}
