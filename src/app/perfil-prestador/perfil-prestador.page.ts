import { Component } from '@angular/core';
import { ColetaBackendService, IColetaBackendResponse, IColetaUser } from '../services/coleta-backend.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-prestador',
  templateUrl: 'perfil-prestador.page.html',
  styleUrls: ['perfil-prestador.page.scss'],
  standalone: false,
})
export class PerfilPrestadorPage {


  constructor(
    private ColetaService: ColetaBackendService,
    private alertController: AlertController,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.carregarUsuarioEColetas();
  }

  nomeUsuario: string = '';

  carregarUsuarioEColetas() {
    this.ColetaService.getCurrentUserData().subscribe({
      next: (res: IColetaBackendResponse<IColetaUser>) => {
        if (res.data) {
          this.nomeUsuario = res.data.name;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    });
  }

  async cliqueFuncaoDesabilitada() {
    const alert = await this.alertController.create({
      header: 'Função Indisponível',
      message: 'Esta funcionalidade está desabilitada no momento. Novas implementações estão previstas para a próxima sprint.',
      buttons: ['OK']
    });

    await alert.present();
  }

  irParaCarteira(){
    this.router.navigateByUrl('/carteira-prestador')
  }

  irParaNotificacao(){
    this.router.navigateByUrl('/notificacoes')
  }

}
