import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpAllUsersComponent } from './cp-all-users.component';

describe('CpAllUsersComponent', () => {
  let component: CpAllUsersComponent;
  let fixture: ComponentFixture<CpAllUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpAllUsersComponent]
    });
    fixture = TestBed.createComponent(CpAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
