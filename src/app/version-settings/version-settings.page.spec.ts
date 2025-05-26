import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VersionSettingsPage } from './version-settings.page';

describe('VersionSettingsPage', () => {
  let component: VersionSettingsPage;
  let fixture: ComponentFixture<VersionSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
