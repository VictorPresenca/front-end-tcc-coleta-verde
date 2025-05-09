import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizarPedidoPrestadorPage } from './finalizar-pedido-prestador.page';

describe('FinalizarPedidoPrestadorPage', () => {
  let component: FinalizarPedidoPrestadorPage;
  let fixture: ComponentFixture<FinalizarPedidoPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarPedidoPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
