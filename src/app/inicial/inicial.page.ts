import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
  standalone: false,
})
export class InicialPage  implements OnInit{

  ngOnInit() {
  }

  logoPath = 'assets/imagens/logo-app-coleta-verde.png';
  backgroundPath = 'assets/imagens/fundo-arvores-removebg-preview.png';

  constructor() { }

}
