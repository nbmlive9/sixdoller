import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRoiReportComponent } from './wallet-roi-report.component';

describe('WalletRoiReportComponent', () => {
  let component: WalletRoiReportComponent;
  let fixture: ComponentFixture<WalletRoiReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletRoiReportComponent]
    });
    fixture = TestBed.createComponent(WalletRoiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
