import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueWalletsDataComponent } from './unique-wallets-data.component';

describe('UniqueWalletsDataComponent', () => {
  let component: UniqueWalletsDataComponent;
  let fixture: ComponentFixture<UniqueWalletsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniqueWalletsDataComponent]
    });
    fixture = TestBed.createComponent(UniqueWalletsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
