import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroPrestadorPage } from './cadastro-prestador.page';

describe('CadastroPrestadorPage', () => {
  let component: CadastroPrestadorPage;
  let fixture: ComponentFixture<CadastroPrestadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
