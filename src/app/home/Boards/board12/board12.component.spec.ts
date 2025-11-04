import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Board12Component } from './board12.component';

describe('Board12Component', () => {
  let component: Board12Component;
  let fixture: ComponentFixture<Board12Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Board12Component]
    });
    fixture = TestBed.createComponent(Board12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
