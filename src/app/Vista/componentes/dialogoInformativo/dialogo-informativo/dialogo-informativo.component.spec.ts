import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoInformativoComponent } from './dialogo-informativo.component';

describe('DialogoInformativoComponent', () => {
  let component: DialogoInformativoComponent;
  let fixture: ComponentFixture<DialogoInformativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoInformativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoInformativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
