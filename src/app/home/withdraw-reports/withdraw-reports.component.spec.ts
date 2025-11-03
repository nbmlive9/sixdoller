import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawReportsComponent } from './withdraw-reports.component';

describe('WithdrawReportsComponent', () => {
  let component: WithdrawReportsComponent;
  let fixture: ComponentFixture<WithdrawReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawReportsComponent]
    });
    fixture = TestBed.createComponent(WithdrawReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
