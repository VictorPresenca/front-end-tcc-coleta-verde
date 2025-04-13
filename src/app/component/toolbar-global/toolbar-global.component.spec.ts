import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolbarGlobalComponent } from './toolbar-global.component';

describe('ToolbarGlobalComponent', () => {
  let component: ToolbarGlobalComponent;
  let fixture: ComponentFixture<ToolbarGlobalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarGlobalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
