import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board4Component } from './board4.component';

describe('Board4Component', () => {
  let component: Board4Component;
  let fixture: ComponentFixture<Board4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board4Component]
    });
    fixture = TestBed.createComponent(Board4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
