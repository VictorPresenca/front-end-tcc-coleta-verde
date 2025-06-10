import { Component, OnInit } from '@angular/core';
import { ColetaBackendService, IColetaAddress } from '../services/coleta-backend.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dados-da-conta',
  templateUrl: './dados-da-conta.page.html',
  styleUrls: ['./dados-da-conta.page.scss'],
  standalone:false
})
export class DadosDaContaPage implements OnInit {
  currentUser: any;
  enderecos: IColetaAddress[] = [];
  selectedEnderecoIndex: number | null = null;

  constructor(
    private coletaBackendService: ColetaBackendService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.coletaBackendService.getCurrentUserData().subscribe({
      next: (value) => {
        this.currentUser = value.data!;
        console.log(this.currentUser);
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

  onEnderecoChange(event: any) {
    this.selectedEnderecoIndex = event.detail.value;
  }
}
