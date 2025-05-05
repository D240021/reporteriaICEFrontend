import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReporteTPMComponent } from './editar-reporte-tpm.component';

describe('EditarReporteTPMComponent', () => {
  let component: EditarReporteTPMComponent;
  let fixture: ComponentFixture<EditarReporteTPMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReporteTPMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReporteTPMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
