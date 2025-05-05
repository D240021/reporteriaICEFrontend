import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLineaTransmisionComponent } from './agregar-linea-transmision.component';

describe('AgregarLineaTransmisionComponent', () => {
  let component: AgregarLineaTransmisionComponent;
  let fixture: ComponentFixture<AgregarLineaTransmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarLineaTransmisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarLineaTransmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
