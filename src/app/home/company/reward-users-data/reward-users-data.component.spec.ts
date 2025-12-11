import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardUsersDataComponent } from './reward-users-data.component';

describe('RewardUsersDataComponent', () => {
  let component: RewardUsersDataComponent;
  let fixture: ComponentFixture<RewardUsersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardUsersDataComponent]
    });
    fixture = TestBed.createComponent(RewardUsersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
