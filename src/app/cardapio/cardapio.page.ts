import { Component, OnInit } from '@angular/core';
import { ColetaBackendService } from '../services/coleta-backend.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: false,
})
export class CardapioPage implements OnInit {
  solicitacoes: any[] | undefined;
  constructor(private coleta: ColetaBackendService) { }

  ngOnInit() {
    this.coleta.listarSolicitacoes(1, 5).subscribe({
      next: (valor) => {
        this.solicitacoes = valor.data;
      },
      error(err) {
        console.log(err)
      },
    })
  }

}
