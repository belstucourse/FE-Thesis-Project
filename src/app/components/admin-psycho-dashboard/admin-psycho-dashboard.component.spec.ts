import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPsychoDashboardComponent } from './admin-psycho-dashboard.component';

describe('AdminPsychoDashboardComponent', () => {
  let component: AdminPsychoDashboardComponent;
  let fixture: ComponentFixture<AdminPsychoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPsychoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPsychoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
