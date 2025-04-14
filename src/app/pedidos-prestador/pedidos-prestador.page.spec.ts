import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosPrestadorPage } from './pedidos-prestador.page';

describe('PedidosPrestadorPage', () => {
  let component: PedidosPrestadorPage;
  let fixture: ComponentFixture<PedidosPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
