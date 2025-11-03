import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionBonusComponent } from './promotion-bonus.component';

describe('PromotionBonusComponent', () => {
  let component: PromotionBonusComponent;
  let fixture: ComponentFixture<PromotionBonusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionBonusComponent]
    });
    fixture = TestBed.createComponent(PromotionBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
