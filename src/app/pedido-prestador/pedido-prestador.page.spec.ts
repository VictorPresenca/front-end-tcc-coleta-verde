import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoPrestadorPage } from './pedido-prestador.page';

describe('PedidoPrestadorPage', () => {
  let component: PedidoPrestadorPage;
  let fixture: ComponentFixture<PedidoPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
