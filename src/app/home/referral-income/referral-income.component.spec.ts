import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralIncomeComponent } from './referral-income.component';

describe('ReferralIncomeComponent', () => {
  let component: ReferralIncomeComponent;
  let fixture: ComponentFixture<ReferralIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralIncomeComponent]
    });
    fixture = TestBed.createComponent(ReferralIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
