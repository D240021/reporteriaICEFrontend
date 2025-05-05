import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarOperarioComponent } from './consultar-operario.component';

describe('ConsultarOperarioComponent', () => {
  let component: ConsultarOperarioComponent;
  let fixture: ComponentFixture<ConsultarOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarOperarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
