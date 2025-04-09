import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importe IonicModule

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true, // Certifique-se de que standalone é true
  imports: [IonicModule] // Adicione IonicModule aos imports
})
export class CadastroPage implements OnInit {
  passwordVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}