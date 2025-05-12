import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ColetaBackendService } from '../services/coleta-backend.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: false,
})
export class CardapioPage implements OnInit {

  solicitacoes: any[] = [];

  constructor(private coleta: ColetaBackendService, private http: HttpClient) { }

  ngOnInit() {
    this.carregarSolicitacoes();
  }


  carregarSolicitacoes(){

    this.coleta.listarSolicitacoes(1, 10)
    .subscribe(
      (res: any) => {
        this.solicitacoes = res.data || [];
      },
      (err: any) => {
        console.error('Erro ao carregar solicitações', err);
      }
    );
  }

  // Esse bloco serve pra formatar o "createdAt" em data legível para humanos - (método timestamp)

  // formatDate(timestamp: number): string {
  //   const date = new Date(timestamp);
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');

  //   return `${day}/${month}/${year} ${hours}:${minutes}`;
  // }

}
