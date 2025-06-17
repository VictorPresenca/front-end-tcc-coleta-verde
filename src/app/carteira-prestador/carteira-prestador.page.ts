import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ColetaBackendService, IColetaUser } from '../services/coleta-backend.service';

@Component({
  selector: 'app-carteira-prestador',
  templateUrl: './carteira-prestador.page.html',
  styleUrls: ['./carteira-prestador.page.scss'],
  standalone: false
})
export class CarteiraPrestadorPage implements OnInit {
  saldoDisponivel: number = 0;
  isLoading: boolean = true;

  constructor(private coletaService: ColetaBackendService, private navCtrl: NavController) {}

  async ngOnInit() {
    await this.carregarSaldo();
  }

  async carregarSaldo() {
    try {
      const userRes = await this.coletaService.getCurrentUserData().toPromise();
      if (userRes?.data) {
        this.saldoDisponivel = await this.coletaService.calcularSaldoDisponivel(userRes.data.id).toPromise() || 0;
      }
    } catch (error) {
      console.error('Erro ao carregar saldo:', error);
    } finally {
      this.isLoading = false;
    }
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });
  }


  solicitarSaque() {
    // Implemente a lógica de saque aqui
    console.log('Solicitando saque...');
  }

  verTodasTransacoes() {
    this.navCtrl.navigateForward('/extrato-prestador');
  }
}
