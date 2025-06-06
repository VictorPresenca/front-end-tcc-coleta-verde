import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, IColetaAddress } from '../services/coleta-backend.service';
import { ToastController } from '@ionic/angular';
import { FormControl } from '@angular/forms';  // importação do FormControl

@Component({
  selector: 'app-dados-da-conta',
  templateUrl: './dados-da-conta.page.html',
  styleUrls: ['./dados-da-conta.page.scss'],
  standalone:false
})
export class DadosDaContaPage implements OnInit {
  currentUser: any;
  enderecos: IColetaAddress[] = [];

  enderecoSel = new FormControl();  // FormControl para o ion-select

  constructor(
    private coletaBackendService: ColetaBackendService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.coletaBackendService.getCurrentUserData().subscribe({
      next: (value) => {
        this.currentUser = value.data!;
      },
      error: ({ error }) => {
        this.toastController.create({
          message: error.message,
          duration: 2000
        }).then(toast => toast.present());
      },
    });

    this.coletaBackendService.listarEndereco().subscribe({
      next: res => {
        this.enderecos = res.data ?? [];
      },
      error: err => {
        console.error('Erro ao carregar endereços', err);
      }
    });
  }
}
