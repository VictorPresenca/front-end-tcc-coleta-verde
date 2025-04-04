import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciamentoDeSolicitacoesPage } from './gerenciamento-de-solicitacoes.page';

describe('GerenciamentoDeSolicitacoesPage', () => {
  let component: GerenciamentoDeSolicitacoesPage;
  let fixture: ComponentFixture<GerenciamentoDeSolicitacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoDeSolicitacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
