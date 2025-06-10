import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, IColetaUser } from '../services/coleta-backend.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.page.html',
  styleUrls: ['./perfil-cliente.page.scss'],
  standalone: false,
})
export class PerfilClientePage implements OnInit {
  currentUser: IColetaUser | undefined;

  constructor(
    private coletaBackendService: ColetaBackendService,
    private toastController: ToastController,
    private router: Router // Injete o Router no construtor
  ) { }

  ngOnInit() {
    this.coletaBackendService.getCurrentUserData().subscribe({
      next: (value) => {
        this.currentUser = value.data!;
        console.log(this)
      },
      error: ({ error }) => {
        this.toastController.create({
          message: error.message,
          duration: 2000
        }).then(toast => toast.present()); // Mostre o toast
      },
    });
  }

  abrirLeilao() {
    this.router.navigate(['/leilao']);
  }


abrirDadosConta() {
  this.router.navigate(['/dados-da-conta']);
}
abrirNotificacoes() {
  this.router.navigate(['/notificacoes']);
}
}
