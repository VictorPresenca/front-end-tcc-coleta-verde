import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule] // Importe FormsModule para o ngModel
})
export class CadastroClientePage implements OnInit {
  logoPath = 'assets/imagens/logo-app-coleta-verde.png';
  backgroundPath = 'assets/imagens/fundo-arvores-removebg-preview.png';
  passwordVisible: boolean = false;
  nomeEmpresa: string = '';
  cnpjEmpresa: string = '';
  nomeRepresentante: string = '';
  email: string = '';
  senha: string = '';

  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}