import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubestacionComponent } from './editar-subestacion.component';

describe('EditarSubestacionComponent', () => {
  let component: EditarSubestacionComponent;
  let fixture: ComponentFixture<EditarSubestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSubestacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSubestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
