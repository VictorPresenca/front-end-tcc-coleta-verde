import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarteiraPrestadorPage } from './carteira-prestador.page';

describe('CarteiraPrestadorPage', () => {
  let component: CarteiraPrestadorPage;
  let fixture: ComponentFixture<CarteiraPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteiraPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
