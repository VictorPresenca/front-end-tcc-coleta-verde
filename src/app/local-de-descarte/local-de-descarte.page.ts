import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColetaBackendService } from '../services/coleta-backend.service';


@Component({
  selector: 'app-local-de-descarte',
  templateUrl: './local-de-descarte.page.html',
  styleUrls: ['./local-de-descarte.page.scss'],
  standalone: false
})
export class LocalDeDescartePage implements OnInit {

  constructor(
    private router: Router,
    private ColetaService: ColetaBackendService
  ) { }

  ngOnInit() {
  }

}
