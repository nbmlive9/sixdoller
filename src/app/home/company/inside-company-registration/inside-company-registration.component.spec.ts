import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideCompanyRegistrationComponent } from './inside-company-registration.component';

describe('InsideCompanyRegistrationComponent', () => {
  let component: InsideCompanyRegistrationComponent;
  let fixture: ComponentFixture<InsideCompanyRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsideCompanyRegistrationComponent]
    });
    fixture = TestBed.createComponent(InsideCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
