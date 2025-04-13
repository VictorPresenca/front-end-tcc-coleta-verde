import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacaoPage } from './solicitacao.page';

describe('SolicitacaoPage', () => {
  let component: SolicitacaoPage;
  let fixture: ComponentFixture<SolicitacaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
