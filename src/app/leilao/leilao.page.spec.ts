import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeilaoPage } from './leilao.page';

describe('LeilaoPage', () => {
  let component: LeilaoPage;
  let fixture: ComponentFixture<LeilaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeilaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
