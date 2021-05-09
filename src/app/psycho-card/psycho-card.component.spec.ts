import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychoCardComponent } from './psycho-card.component';

describe('PsychoCardComponent', () => {
  let component: PsychoCardComponent;
  let fixture: ComponentFixture<PsychoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
