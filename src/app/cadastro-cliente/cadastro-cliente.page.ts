import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importe IonicModule

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule] // Adicione IonicModule aos imports
})
export class CadastroClientePage implements OnInit {
  passwordVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}