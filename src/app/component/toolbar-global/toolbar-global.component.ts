import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-global',
  templateUrl: './toolbar-global.component.html',
  styleUrls: ['./toolbar-global.component.scss'],
  standalone: false,
})
export class ToolbarGlobalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() titulo: string = 'Título'; // Personalizável por página

  abrirNotificacoes() {
    // Coloque aqui a lógica para abrir as notificações
    console.log('Notificações abertas!');
  }

}
