import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: 'perfil-prestador.page.html',
  styleUrls: ['perfil-prestador.page.scss'],
  standalone: false,
})
export class PerfilPrestadorPage {

  constructor(private router: Router) {}

  irParaCarteira(){
    this.router.navigateByUrl('/carteira-prestador')
  }

}
