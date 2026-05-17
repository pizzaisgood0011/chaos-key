import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthMeter } from './strength-meter';

describe('StrengthMeter', () => {
  let component: StrengthMeter;
  let fixture: ComponentFixture<StrengthMeter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrengthMeter],
    }).compileComponents();

    fixture = TestBed.createComponent(StrengthMeter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
