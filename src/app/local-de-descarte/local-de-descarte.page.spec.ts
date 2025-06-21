import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalDeDescartePage } from './local-de-descarte.page';

describe('LocalDeDescartePage', () => {
  let component: LocalDeDescartePage;
  let fixture: ComponentFixture<LocalDeDescartePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDeDescartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
