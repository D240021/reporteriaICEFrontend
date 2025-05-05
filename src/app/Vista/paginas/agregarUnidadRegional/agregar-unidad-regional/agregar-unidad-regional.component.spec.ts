import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUnidadRegionalComponent } from './agregar-unidad-regional.component';

describe('AgregarUnidadRegionalComponent', () => {
  let component: AgregarUnidadRegionalComponent;
  let fixture: ComponentFixture<AgregarUnidadRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarUnidadRegionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarUnidadRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
