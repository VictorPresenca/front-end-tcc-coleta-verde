import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PedidosClientePage } from './pedidos-cliente.page';

describe('Tab2Page', () => {
  let component: PedidosClientePage;
  let fixture: ComponentFixture<PedidosClientePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidosClientePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
