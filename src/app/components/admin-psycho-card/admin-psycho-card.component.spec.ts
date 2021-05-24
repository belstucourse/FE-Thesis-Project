import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPsychoCardComponent } from './admin-psycho-card.component';

describe('AdminPsychoCardComponent', () => {
  let component: AdminPsychoCardComponent;
  let fixture: ComponentFixture<AdminPsychoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPsychoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPsychoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
