import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedWalletComponent } from './received-wallet.component';

describe('ReceivedWalletComponent', () => {
  let component: ReceivedWalletComponent;
  let fixture: ComponentFixture<ReceivedWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedWalletComponent]
    });
    fixture = TestBed.createComponent(ReceivedWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
