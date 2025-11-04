import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board6Component } from './board6.component';

describe('Board6Component', () => {
  let component: Board6Component;
  let fixture: ComponentFixture<Board6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board6Component]
    });
    fixture = TestBed.createComponent(Board6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
