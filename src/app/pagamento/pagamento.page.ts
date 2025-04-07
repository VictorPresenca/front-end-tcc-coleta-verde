import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: false,
})
export class PagamentoPage implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
