import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSubestacionComponent } from './consultar-subestacion.component';

describe('ConsultarSubestacionComponent', () => {
  let component: ConsultarSubestacionComponent;
  let fixture: ComponentFixture<ConsultarSubestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarSubestacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarSubestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
