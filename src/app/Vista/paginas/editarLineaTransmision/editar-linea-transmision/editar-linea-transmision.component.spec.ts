import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLineaTransmisionComponent } from './editar-linea-transmision.component';

describe('EditarLineaTransmisionComponent', () => {
  let component: EditarLineaTransmisionComponent;
  let fixture: ComponentFixture<EditarLineaTransmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLineaTransmisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLineaTransmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
