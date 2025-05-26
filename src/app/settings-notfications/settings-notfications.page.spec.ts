import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsNotficationsPage } from './settings-notfications.page';

describe('SettingsNotficationsPage', () => {
  let component: SettingsNotficationsPage;
  let fixture: ComponentFixture<SettingsNotficationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNotficationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
