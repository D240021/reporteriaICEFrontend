import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarOperarioComponent } from './registrar-operario.component';

describe('RegistrarOperarioComponent', () => {
  let component: RegistrarOperarioComponent;
  let fixture: ComponentFixture<RegistrarOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarOperarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
