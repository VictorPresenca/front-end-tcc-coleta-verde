import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-prestador',
  templateUrl: './home-prestador.page.html',
  styleUrls: ['./home-prestador.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irParaCardapio() {
    this.router.navigate(['/cardapio']);
  }
}



