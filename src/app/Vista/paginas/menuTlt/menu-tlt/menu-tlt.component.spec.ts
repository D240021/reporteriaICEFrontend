import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTltComponent } from './menu-tlt.component';

describe('MenuTltComponent', () => {
  let component: MenuTltComponent;
  let fixture: ComponentFixture<MenuTltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTltComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
