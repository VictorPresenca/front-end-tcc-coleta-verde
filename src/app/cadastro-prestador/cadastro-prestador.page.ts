import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http' ;
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

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(){

    const dadosCadastro = {
      name: this.nomeCompleto,
      cpf: this.cpf,
      email: this.email,
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