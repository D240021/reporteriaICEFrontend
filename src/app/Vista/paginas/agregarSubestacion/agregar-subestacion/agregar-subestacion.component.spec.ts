import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubestacionComponent } from './agregar-subestacion.component';

describe('AgregarSubestacionComponent', () => {
  let component: AgregarSubestacionComponent;
  let fixture: ComponentFixture<AgregarSubestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarSubestacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSubestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
