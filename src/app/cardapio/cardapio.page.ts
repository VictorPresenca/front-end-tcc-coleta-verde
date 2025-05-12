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

  ngOnInit() {}


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
}
