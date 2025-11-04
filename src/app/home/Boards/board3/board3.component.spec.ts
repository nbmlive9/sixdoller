import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board3Component } from './board3.component';

describe('Board3Component', () => {
  let component: Board3Component;
  let fixture: ComponentFixture<Board3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board3Component]
    });
    fixture = TestBed.createComponent(Board3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
