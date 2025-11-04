import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board14Component } from './board14.component';

describe('Board14Component', () => {
  let component: Board14Component;
  let fixture: ComponentFixture<Board14Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board14Component]
    });
    fixture = TestBed.createComponent(Board14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
