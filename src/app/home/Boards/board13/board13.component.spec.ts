import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board13Component } from './board13.component';

describe('Board13Component', () => {
  let component: Board13Component;
  let fixture: ComponentFixture<Board13Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board13Component]
    });
    fixture = TestBed.createComponent(Board13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
