import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSupportComponent } from './cp-support.component';

describe('CpSupportComponent', () => {
  let component: CpSupportComponent;
  let fixture: ComponentFixture<CpSupportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpSupportComponent]
    });
    fixture = TestBed.createComponent(CpSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
