import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLineaTransmisionComponent } from './consultar-linea-transmision.component';

describe('ConsultarLineaTransmisionComponent', () => {
  let component: ConsultarLineaTransmisionComponent;
  let fixture: ComponentFixture<ConsultarLineaTransmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLineaTransmisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarLineaTransmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
