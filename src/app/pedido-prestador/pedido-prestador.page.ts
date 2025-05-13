import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColetaBackendService } from '../services/coleta-backend.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedido-prestador',
  templateUrl: './pedido-prestador.page.html',
  styleUrls: ['./pedido-prestador.page.scss'],
  standalone: false,
})
export class PedidoPrestadorPage implements OnInit {

  solicitationId!: number;

  constructor(private route: ActivatedRoute,
    private coletaService: ColetaBackendService,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {}

  ngOnInit() {
  }

    ionViewWillEnter() {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('id')); // ou de onde você estiver pegando o ID
  }

  async aceitarSolicitacao() {
    this.coletaService.aceitarSolicitacao(this.solicitationId).subscribe({
      next: async (res) => {
        if (res.status === 200) {
          const toast = await this.toastCtrl.create({
            message: 'Solicitação aceita com sucesso!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.navCtrl.navigateBack('/cardapio'); // ou a rota que quiser voltar
        } else {
          this.showErro(res.message ?? 'Erro ao aceitar a solicitação');
        }
      },
      error: () => {
        this.showErro('Erro de conexão com o servidor');
      }
    });
  }

  async showErro(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  
}
