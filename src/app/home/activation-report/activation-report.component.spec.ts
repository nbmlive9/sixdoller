import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationReportComponent } from './activation-report.component';

describe('ActivationReportComponent', () => {
  let component: ActivationReportComponent;
  let fixture: ComponentFixture<ActivationReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationReportComponent]
    });
    fixture = TestBed.createComponent(ActivationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
