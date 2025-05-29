import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColetaBackendService, IColetaBackendResponse, IColetaUser } from '../services/coleta-backend.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-home-prestador',
  templateUrl: './home-prestador.page.html',
  styleUrls: ['./home-prestador.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  constructor(
    private router: Router,
    private ColetaService: ColetaBackendService
  ) { }

  ngOnInit() {
    this.carregarUsuarioEColetas();
  }

  nomeUsuario: string = '';

  irParaCardapio() {
    this.router.navigate(['/cardapio']);
  }

  carregarUsuarioEColetas() {
    this.ColetaService.getCurrentUserData().subscribe({
      next: (res: IColetaBackendResponse<IColetaUser>) => {
        if (res.data) {
          this.nomeUsuario = res.data.name;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }
}



