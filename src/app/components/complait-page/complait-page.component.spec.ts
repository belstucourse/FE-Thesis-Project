import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaitPageComponent } from './complait-page.component';

describe('ComplaitPageComponent', () => {
  let component: ComplaitPageComponent;
  let fixture: ComponentFixture<ComplaitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
