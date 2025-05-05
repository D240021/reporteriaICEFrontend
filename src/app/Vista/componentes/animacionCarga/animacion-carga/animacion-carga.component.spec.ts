import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimacionCargaComponent } from './animacion-carga.component';

describe('AnimacionCargaComponent', () => {
  let component: AnimacionCargaComponent;
  let fixture: ComponentFixture<AnimacionCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimacionCargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimacionCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
