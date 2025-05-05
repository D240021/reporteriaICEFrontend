import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUnidadRegionalComponent } from './editar-unidad-regional.component';

describe('EditarUnidadRegionalComponent', () => {
  let component: EditarUnidadRegionalComponent;
  let fixture: ComponentFixture<EditarUnidadRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUnidadRegionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUnidadRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
