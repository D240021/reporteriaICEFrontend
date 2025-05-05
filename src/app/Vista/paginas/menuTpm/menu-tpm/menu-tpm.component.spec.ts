import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTpmComponent } from './menu-tpm.component';

describe('MenuTpmComponent', () => {
  let component: MenuTpmComponent;
  let fixture: ComponentFixture<MenuTpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTpmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
