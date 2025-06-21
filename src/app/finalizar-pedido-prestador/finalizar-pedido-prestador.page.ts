import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ColetaBackendService } from '../services/coleta-backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finalizar-pedido-prestador',
  templateUrl: './finalizar-pedido-prestador.page.html',
  styleUrls: ['./finalizar-pedido-prestador.page.scss'],
  standalone: false
})
export class FinalizarPedidoPrestadorPage implements OnInit {

  solicitationId!: number;

  constructor(private toastCtrl: ToastController, private router: Router, private route:ActivatedRoute, private back: ColetaBackendService) {}

  ngOnInit() {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('id'));
  }

  finalizar() {
    this.back.finalizarSolicitacao(this.solicitationId).subscribe({
      next: async (res) => {
        console.log('Solicitação finalizada com sucesso!', this.solicitationId);
        
        if (res.status === 200) {
          const toast = await this.toastCtrl.create({
            message: 'Solicitação finalizada com sucesso!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();
          this.router.navigateByUrl('/local-de-descarte');
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Erro ao finalizar solicitação!',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      },
      error: async () => {
        console.log('Erro de conexão com o servidor');
        const toast = await this.toastCtrl.create({
          message: 'Erro de conexão com o servidor!',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }


  cancelar() {
    this.router.navigateByUrl('/pedidos-prestador');
  }
}

