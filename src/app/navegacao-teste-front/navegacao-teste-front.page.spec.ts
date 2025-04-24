import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavegacaoTesteFrontPage } from './navegacao-teste-front.page';

describe('NavegacaoTesteFrontPage', () => {
  let component: NavegacaoTesteFrontPage;
  let fixture: ComponentFixture<NavegacaoTesteFrontPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacaoTesteFrontPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
