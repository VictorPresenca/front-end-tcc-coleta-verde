import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

initializeApp() {
  this.platform.ready().then(() => {
    let gen = () => Math.floor(Math.random() * 255);
    let show = () => console.log('%cOi, utilize os serviços do ColetaBackendService na criação de uma tela, nao faça nada que utiliza o backend sem usar o service! Obrigado\nUse o service em src/services/coleta-backend.service.ts, o service tem funções prontas para uso do backend, se não tiver a função que você deseja, CRIE A FUNÇÃO, em resumo: %cUSE O SERVICE%c\nNão sabe como fazer? Aprenda: https://chat.com?prompt=' + encodeURIComponent('Olá, chat! Poderia me explicar como eu utilizo um service no IONIC ANGULAR? Eu tenho um service criado, porém, não sei como utilizar ele, obrigado, chat'), 'font-size: 30px', `font-weight: bolder; color: rgb(${gen()}, ${gen()}, ${gen()}); font-size: 50px`, 'font-size: 20px');
    console.clear();
    show();
    setInterval(show, 60_000);
    document.body.classList.remove('dark');
  });
}


  
}
