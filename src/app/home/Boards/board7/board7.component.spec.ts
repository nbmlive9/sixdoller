import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board7Component } from './board7.component';

describe('Board7Component', () => {
  let component: Board7Component;
  let fixture: ComponentFixture<Board7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board7Component]
    });
    fixture = TestBed.createComponent(Board7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
