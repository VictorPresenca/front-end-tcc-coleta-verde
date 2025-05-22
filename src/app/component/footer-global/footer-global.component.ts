import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, EColetaRole } from 'src/app/services/coleta-backend.service';

@Component({
  selector: 'app-footer-global',
  templateUrl: './footer-global.component.html',
  styleUrls: ['./footer-global.component.scss'],
  standalone: false,
})
export class FooterGlobalComponent  implements OnInit {

  role: EColetaRole | null = null;
  EColetaRole = EColetaRole;

  constructor(private coletaService: ColetaBackendService) { }

  ngOnInit() {
    this.coletaService.getCurrentUserData().subscribe({
      next: (res) => {
        this.role = res.data?.role ?? null;
      },
      error: () => {
        this.role = null;
      }
    });
  }
}