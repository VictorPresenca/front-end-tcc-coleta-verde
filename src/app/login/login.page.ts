import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login', // Altere o selector para corresponder ao componente de login
  templateUrl: './login.page.html', // Use o template correto para login
  styleUrls: ['./login.page.scss'], // Use os estilos corretos para login
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class LoginPage { // Altere o nome da classe para LoginPage
  passwordVisible: boolean = false;

  constructor() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
