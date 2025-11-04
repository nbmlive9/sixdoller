import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelIncomeComponent } from './level-income.component';

describe('LevelIncomeComponent', () => {
  let component: LevelIncomeComponent;
  let fixture: ComponentFixture<LevelIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelIncomeComponent]
    });
    fixture = TestBed.createComponent(LevelIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
