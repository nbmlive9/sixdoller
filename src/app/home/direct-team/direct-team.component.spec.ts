import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTeamComponent } from './direct-team.component';

describe('DirectTeamComponent', () => {
  let component: DirectTeamComponent;
  let fixture: ComponentFixture<DirectTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectTeamComponent]
    });
    fixture = TestBed.createComponent(DirectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
