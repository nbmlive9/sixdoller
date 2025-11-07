import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoyaltyUsersDataComponent } from './royalty-users-data.component';

describe('RoyaltyUsersDataComponent', () => {
  let component: RoyaltyUsersDataComponent;
  let fixture: ComponentFixture<RoyaltyUsersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoyaltyUsersDataComponent]
    });
    fixture = TestBed.createComponent(RoyaltyUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
