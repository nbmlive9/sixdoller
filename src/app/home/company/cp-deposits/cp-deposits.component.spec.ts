import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpDepositsComponent } from './cp-deposits.component';

describe('CpDepositsComponent', () => {
  let component: CpDepositsComponent;
  let fixture: ComponentFixture<CpDepositsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpDepositsComponent]
    });
    fixture = TestBed.createComponent(CpDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
