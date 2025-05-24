import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SolicitacaoService {
  private apiUrl = 'https://coletaverde.up.railway.app/solicitation/all';
  private solicitacoes = new BehaviorSubject<any[]>([]);
  solicitacoes$ = this.solicitacoes.asObservable();

  constructor(private http: HttpClient) {
    timer(0, 30000)
      .pipe(switchMap(() => this.http.get<any[]>(this.apiUrl)))
      .subscribe(solicitacoes => {
        this.solicitacoes.next(solicitacoes);
      });
  }
}

