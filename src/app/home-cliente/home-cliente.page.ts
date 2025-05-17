import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
  standalone: false
})
export class HomeClientePage implements OnInit, OnDestroy {
  @ViewChild('carrossel', { read: ElementRef }) carrossel!: ElementRef;

  cards = [
    {
      img: '/assets/imagens/arvore-icone-png.png',
      alt: 'Ícone árvore',
      texto: 'Preservar o meio ambiente começa com o destino do seu lixo.'
    },
    {
      img: '/assets/imagens/folhas-verdes-icone-png.png',
      alt: 'Ícone folhas verdes',
      texto: 'Descartar com consciência é plantar um futuro melhor.'
    },
    {
      img: '/assets/imagens/arvore-icone-png.png',
      alt: 'Ícone árvore',
      texto: 'O mundo muda quando a gente aprende a descartar.'
    }
  ];

  autoScrollInterval: any;
  hoveredIndex: number | null = null;

  ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    clearInterval(this.autoScrollInterval);
  }

  startAutoScroll() {
    const scrollContainer = this.carrossel.nativeElement;
    this.autoScrollInterval = setInterval(() => {
      if (this.hoveredIndex !== null) return;

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: 362, behavior: 'smooth' }); // largura do card + gap
      }
    }, 3000);
  }

  scrollToCard(index: number) {
    const scrollContainer = this.carrossel.nativeElement;
    const cardWidth = 362;
    scrollContainer.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }

  hoverCard(index: number) {
    this.hoveredIndex = index;
  }

  leaveCard() {
    this.hoveredIndex = null;
  }
}
