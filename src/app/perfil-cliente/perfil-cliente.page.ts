import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, IColetaUser } from '../services/coleta-backend.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.page.html',
  styleUrls: ['./perfil-cliente.page.scss'],
  standalone: false,
})
export class PerfilClientePage implements OnInit {
  currentUser: IColetaUser | undefined;

  constructor(private coletaBackendService: ColetaBackendService, private toastController: ToastController) { }

  ngOnInit() {
    this.coletaBackendService.getCurrentUserData().subscribe({
      next: (value) => {
        this.currentUser = value.data!;
      },
      error: ({ error }) => {
        this.toastController.create({
          message: error.message,
          duration: 2000
        });
      },
    })
  }

}
