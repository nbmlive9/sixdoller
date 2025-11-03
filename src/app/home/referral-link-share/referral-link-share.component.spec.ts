import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralLinkShareComponent } from './referral-link-share.component';

describe('ReferralLinkShareComponent', () => {
  let component: ReferralLinkShareComponent;
  let fixture: ComponentFixture<ReferralLinkShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralLinkShareComponent]
    });
    fixture = TestBed.createComponent(ReferralLinkShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
