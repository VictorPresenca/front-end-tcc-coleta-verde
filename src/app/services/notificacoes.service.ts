import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, switchMap, tap } from 'rxjs';
import { ColetaBackendService } from './coleta-backend.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacoesService {
  private notificacoes = new BehaviorSubject<any[]>([]);
  notificacoes$ = this.notificacoes.asObservable();

  constructor(private backend: ColetaBackendService) {
    // Atualiza notificações a cada 30 segundos
    timer(0, 30000)
      .pipe(
        switchMap(() => this.backend.listarSolicitacoes(1, 10)), // você pode ajustar paginação
        tap(res => {
          if (res.status === 200 && res.data) {
            this.notificacoes.next(res.data);
          }
        })
      )
      .subscribe();
  }

  forcarAtualizacao() {
    return this.backend.listarSolicitacoes(1, 10).pipe(
      tap(res => {
        if (res.status === 200 && res.data) {
          this.notificacoes.next(res.data);
        }
      })
    );
  }
}
