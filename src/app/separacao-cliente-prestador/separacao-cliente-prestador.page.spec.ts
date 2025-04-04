import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeparacaoClientePrestadorPage } from './separacao-cliente-prestador.page';

describe('SeparacaoClientePrestadorPage', () => {
  let component: SeparacaoClientePrestadorPage;
  let fixture: ComponentFixture<SeparacaoClientePrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparacaoClientePrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
