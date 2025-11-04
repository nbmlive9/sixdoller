import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardIncomeComponent } from './board-income.component';

describe('BoardIncomeComponent', () => {
  let component: BoardIncomeComponent;
  let fixture: ComponentFixture<BoardIncomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardIncomeComponent]
    });
    fixture = TestBed.createComponent(BoardIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
