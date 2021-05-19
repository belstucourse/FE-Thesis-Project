import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedbackPageComponent } from './app-feedback-page.component';

describe('AppFeedbackPageComponent', () => {
  let component: AppFeedbackPageComponent;
  let fixture: ComponentFixture<AppFeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFeedbackPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
