import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ColetaBackendService, IColetaAddress } from '../services/coleta-backend.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.page.html',
  styleUrls: ['./enderecos.page.scss'],
  standalone:false
})
export class EnderecosPage implements OnInit {
  enderecos: IColetaAddress[] = [];

  constructor(
    private coletaBackendService: ColetaBackendService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carregarEnderecos();
  }

  carregarEnderecos() {
    this.coletaBackendService.listarEndereco().subscribe({
      next: res => {
        this.enderecos = res.data ?? [];
      },
      error: err => {
        console.error('Erro ao carregar endereços', err);
      }
    });
  }

  async editarEndereco(endereco: IColetaAddress, index: number) {
    const alert = await this.alertController.create({
      header: 'Editar Endereço',
      inputs: [
        { name: 'cep', type: 'text', placeholder: 'CEP', value: endereco.cep },
        { name: 'logradouro', type: 'text', placeholder: 'Logradouro', value: endereco.logradouro },
        { name: 'complemento', type: 'text', placeholder: 'Complemento', value: endereco.complemento },
        { name: 'bairro', type: 'text', placeholder: 'Bairro', value: endereco.bairro },
        { name: 'localidade', type: 'text', placeholder: 'Localidade', value: endereco.localidade },
        { name: 'uf', type: 'text', placeholder: 'UF', value: endereco.uf },
        { name: 'unidade', type: 'text', placeholder: 'Unidade', value: endereco.unidade },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            // Atualiza localmente — aqui você pode chamar um serviço para atualizar no backend
            this.enderecos[index] = { ...endereco, ...data };
            console.log('Endereço atualizado:', this.enderecos[index]);
          }
        }
      ]
    });

    await alert.present();
  }

  async deletarEndereco(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Tem certeza que deseja deletar este endereço?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            this.coletaBackendService.deletarEnderecoPorIndex(index).subscribe({
              next: () => {
                this.enderecos.splice(index, 1);
                console.log('Endereço deletado com sucesso');
              },
              error: err => {
                console.error('Erro ao deletar endereço', err);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
