import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColetaBackendService } from '../services/coleta-backend.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: false,
})
export class PagamentoPage implements OnInit {
  solicitationId?: string;

  constructor(
    private route: ActivatedRoute,
    private coleta: ColetaBackendService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    this.solicitationId = this.route.snapshot.paramMap.get('id')!;
    console.log('ID da solicitação para pagamento:', this.solicitationId);
  }

  valor: string = 'R$0,00';

formatarMoeda(event: any) {
  let valorDigitado = event.detail.value;

  // Remove tudo que não for número
  let valorNumerico = valorDigitado.replace(/\D/g, '');

  // Converte para centavos e formata
  let valorFormatado = (parseFloat(valorNumerico) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  this.valor = valorFormatado;
}

formasPagamento: string[] = ['Crédito', 'Débito', 'Dinheiro', 'PIX'];
formaSelecionada: string = '';

selecionarForma(forma: string) {
  if (this.formaSelecionada === forma) {
    // Desmarca se clicar de novo
    this.formaSelecionada = '';
  } else {
    // Seleciona nova forma
    this.formaSelecionada = forma;
  }
}

// pagar
async pagar() {
    if (!this.solicitationId) return;

    const loading = await this.loadingCtrl.create({ message: 'Processando pagamento...' });
    await loading.present();

    this.coleta.pagarSolicitacao(Number(this.solicitationId)).subscribe({
      next: async (res) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Sucesso',
          message: 'Pagamento aprovado com sucesso!',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/pedidos-cliente']);
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Não foi possível processar o pagamento.',
          buttons: ['OK'],
        });
        await alert.present();
        console.error(err);
      },
    });
  }

abrirNotificacoes() {
  console.log("Notificações clicadas!");
  // ou redirecione, ou abra modal, etc.
}

}
