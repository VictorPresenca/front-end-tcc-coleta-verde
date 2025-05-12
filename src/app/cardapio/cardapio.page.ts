import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: false,
})
export class CardapioPage implements OnInit {

  solicitacoes: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarSolicitacoes();
  }


  carregarSolicitacoes(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    this.http.get<any>('https://coletaverde.up.railway.app/solicitation/all?page=1&limit=10', { headers }).subscribe(
      res => {
        this.solicitacoes = res.data || [];
      },
      err => {
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
