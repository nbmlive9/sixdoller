import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board5Component } from './board5.component';

describe('Board5Component', () => {
  let component: Board5Component;
  let fixture: ComponentFixture<Board5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board5Component]
    });
    fixture = TestBed.createComponent(Board5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
