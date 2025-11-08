import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMisslianceComponent } from './add-missliance.component';

describe('AddMisslianceComponent', () => {
  let component: AddMisslianceComponent;
  let fixture: ComponentFixture<AddMisslianceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMisslianceComponent]
    });
    fixture = TestBed.createComponent(AddMisslianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
