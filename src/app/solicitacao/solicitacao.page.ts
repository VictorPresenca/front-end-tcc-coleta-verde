import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.page.html',
  styleUrls: ['./solicitacao.page.scss'],
  standalone: false,
})
export class SolicitacaoPage implements OnInit {

  enderecoSelecionado: string = '';
  descricao: string = '';
  valor: number | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fazerSolicitacao() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const body = {
      address: this.enderecoSelecionado,
      description: this.descricao,
      suggestedValue: this.valor
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('https://coletaverde.up.railway.app/solicitation/create', body, { headers })
      .subscribe({
        next: (res) => {
          console.log('Solicitação enviada com sucesso!', res);
          alert('Solicitação enviada com sucesso!');
          // Redirecionar se quiser
          // this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erro ao enviar solicitação:', err);
          alert('Erro ao enviar solicitação.');
        }
      });
  }
}
