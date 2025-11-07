import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpTransferComponent } from './cp-transfer.component';

describe('CpTransferComponent', () => {
  let component: CpTransferComponent;
  let fixture: ComponentFixture<CpTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpTransferComponent]
    });
    fixture = TestBed.createComponent(CpTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
