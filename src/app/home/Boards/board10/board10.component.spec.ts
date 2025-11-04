import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board10Component } from './board10.component';

describe('Board10Component', () => {
  let component: Board10Component;
  let fixture: ComponentFixture<Board10Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board10Component]
    });
    fixture = TestBed.createComponent(Board10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
