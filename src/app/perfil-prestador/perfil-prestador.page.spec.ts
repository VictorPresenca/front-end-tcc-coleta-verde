import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PerfilPrestadorPage } from './perfil-prestador.page';

describe('Tab3Page', () => {
  let component: PerfilPrestadorPage;
  let fixture: ComponentFixture<PerfilPrestadorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPrestadorPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPrestadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
