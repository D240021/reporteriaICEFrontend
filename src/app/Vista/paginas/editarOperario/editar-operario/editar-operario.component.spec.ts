import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOperarioComponent } from './editar-operario.component';

describe('EditarOperarioComponent', () => {
  let component: EditarOperarioComponent;
  let fixture: ComponentFixture<EditarOperarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarOperarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarOperarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
