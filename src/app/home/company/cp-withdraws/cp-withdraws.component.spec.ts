import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpWithdrawsComponent } from './cp-withdraws.component';

describe('CpWithdrawsComponent', () => {
  let component: CpWithdrawsComponent;
  let fixture: ComponentFixture<CpWithdrawsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpWithdrawsComponent]
    });
    fixture = TestBed.createComponent(CpWithdrawsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
