import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board8Component } from './board8.component';

describe('Board8Component', () => {
  let component: Board8Component;
  let fixture: ComponentFixture<Board8Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board8Component]
    });
    fixture = TestBed.createComponent(Board8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
