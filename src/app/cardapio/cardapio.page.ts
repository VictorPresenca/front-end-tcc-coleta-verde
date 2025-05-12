import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { ColetaBackendService } from '../services/coleta-backend.service';
>>>>>>> 44c188b16d3123c5c531d2f7e3c180edaa90b28f

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.page.html',
  styleUrls: ['./cardapio.page.scss'],
  standalone: false,
})
export class CardapioPage implements OnInit {
<<<<<<< HEAD

  solicitacoes: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.carregarSolicitacoes();
=======
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
>>>>>>> 44c188b16d3123c5c531d2f7e3c180edaa90b28f
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
}
