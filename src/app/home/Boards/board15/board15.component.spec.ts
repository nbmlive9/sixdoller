import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board15Component } from './board15.component';

describe('Board15Component', () => {
  let component: Board15Component;
  let fixture: ComponentFixture<Board15Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board15Component]
    });
    fixture = TestBed.createComponent(Board15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
