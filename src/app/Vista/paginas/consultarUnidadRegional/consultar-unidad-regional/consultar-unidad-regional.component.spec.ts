import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUnidadRegionalComponent } from './consultar-unidad-regional.component';

describe('ConsultarUnidadRegionalComponent', () => {
  let component: ConsultarUnidadRegionalComponent;
  let fixture: ComponentFixture<ConsultarUnidadRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarUnidadRegionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarUnidadRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
