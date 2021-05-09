import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPsychoPageComponent } from './registration-psycho-page.component';

describe('RegistrationPsychoPageComponent', () => {
  let component: RegistrationPsychoPageComponent;
  let fixture: ComponentFixture<RegistrationPsychoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPsychoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPsychoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
