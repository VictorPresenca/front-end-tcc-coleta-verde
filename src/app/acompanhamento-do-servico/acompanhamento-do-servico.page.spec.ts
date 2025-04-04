import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcompanhamentoDoServicoPage } from './acompanhamento-do-servico.page';

describe('AcompanhamentoDoServicoPage', () => {
  let component: AcompanhamentoDoServicoPage;
  let fixture: ComponentFixture<AcompanhamentoDoServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcompanhamentoDoServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
