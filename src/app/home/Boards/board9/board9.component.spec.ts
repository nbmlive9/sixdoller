import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board9Component } from './board9.component';

describe('Board9Component', () => {
  let component: Board9Component;
  let fixture: ComponentFixture<Board9Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board9Component]
    });
    fixture = TestBed.createComponent(Board9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
