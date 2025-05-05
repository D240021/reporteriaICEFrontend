import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReporteTLTComponent } from './editar-reporte-tlt.component';

describe('EditarReporteTLTComponent', () => {
  let component: EditarReporteTLTComponent;
  let fixture: ComponentFixture<EditarReporteTLTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReporteTLTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReporteTLTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
