import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsAllDataComponent } from './referrals-all-data.component';

describe('ReferralsAllDataComponent', () => {
  let component: ReferralsAllDataComponent;
  let fixture: ComponentFixture<ReferralsAllDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralsAllDataComponent]
    });
    fixture = TestBed.createComponent(ReferralsAllDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
