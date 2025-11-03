import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMaxComponent } from './buy-max.component';

describe('BuyMaxComponent', () => {
  let component: BuyMaxComponent;
  let fixture: ComponentFixture<BuyMaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyMaxComponent]
    });
    fixture = TestBed.createComponent(BuyMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
