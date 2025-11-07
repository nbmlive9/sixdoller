import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpdashboardComponent } from './cpdashboard.component';

describe('CpdashboardComponent', () => {
  let component: CpdashboardComponent;
  let fixture: ComponentFixture<CpdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpdashboardComponent]
    });
    fixture = TestBed.createComponent(CpdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
