import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GTeamComponent } from './g-team.component';

describe('GTeamComponent', () => {
  let component: GTeamComponent;
  let fixture: ComponentFixture<GTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GTeamComponent]
    });
    fixture = TestBed.createComponent(GTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
