import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

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
  telefone: string = '';
  senha: string = '';

  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}