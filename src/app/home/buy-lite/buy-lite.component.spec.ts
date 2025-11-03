import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLiteComponent } from './buy-lite.component';

describe('BuyLiteComponent', () => {
  let component: BuyLiteComponent;
  let fixture: ComponentFixture<BuyLiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyLiteComponent]
    });
    fixture = TestBed.createComponent(BuyLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
