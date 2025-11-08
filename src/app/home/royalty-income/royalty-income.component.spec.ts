import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyaltyIncomeComponent } from './royalty-income.component';

describe('RoyaltyIncomeComponent', () => {
  let component: RoyaltyIncomeComponent;
  let fixture: ComponentFixture<RoyaltyIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoyaltyIncomeComponent]
    });
    fixture = TestBed.createComponent(RoyaltyIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
