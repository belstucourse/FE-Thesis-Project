import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationClientPageComponent } from './registration-client-page.component';

describe('RegistrationClientPageComponent', () => {
  let component: RegistrationClientPageComponent;
  let fixture: ComponentFixture<RegistrationClientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationClientPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
