import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosDaContaPage } from './dados-da-conta.page';

describe('DadosDaContaPage', () => {
  let component: DadosDaContaPage;
  let fixture: ComponentFixture<DadosDaContaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosDaContaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
