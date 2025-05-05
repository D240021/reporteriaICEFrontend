import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarReporteComponent } from './consultar-reporte.component';

describe('ConsultarReporteComponent', () => {
  let component: ConsultarReporteComponent;
  let fixture: ComponentFixture<ConsultarReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarReporteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
