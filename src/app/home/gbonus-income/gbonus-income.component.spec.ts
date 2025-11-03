import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GbonusIncomeComponent } from './gbonus-income.component';

describe('GbonusIncomeComponent', () => {
  let component: GbonusIncomeComponent;
  let fixture: ComponentFixture<GbonusIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GbonusIncomeComponent]
    });
    fixture = TestBed.createComponent(GbonusIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
