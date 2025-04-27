import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderEnderecoGlobalComponent } from './header-endereco-global.component';

describe('HeaderEnderecoGlobalComponent', () => {
  let component: HeaderEnderecoGlobalComponent;
  let fixture: ComponentFixture<HeaderEnderecoGlobalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEnderecoGlobalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderEnderecoGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
