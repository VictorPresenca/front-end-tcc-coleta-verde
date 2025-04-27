import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-endereco-global',
  templateUrl: './header-endereco-global.component.html',
  styleUrls: ['./header-endereco-global.component.scss'],
  standalone: false,
})
export class HeaderEnderecoGlobalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() endereco: string = 'Título'; // Personalizável por página
  @Input() mostrarBotaoVoltar: boolean = true;

  abrirNotificacoes() {
    // Coloque aqui a lógica para abrir as notificações
    console.log('Notificações abertas!');
  }

}
