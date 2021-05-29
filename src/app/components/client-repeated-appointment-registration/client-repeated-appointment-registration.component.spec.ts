import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRepeatedAppointmentRegistrationComponent } from './client-repeated-appointment-registration.component';

describe('ClientRepeatedAppointmentRegistrationComponent', () => {
  let component: ClientRepeatedAppointmentRegistrationComponent;
  let fixture: ComponentFixture<ClientRepeatedAppointmentRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRepeatedAppointmentRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRepeatedAppointmentRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
