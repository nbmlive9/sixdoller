import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

declare var bootstrap: any;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  submitting = false;
  errorMessage = '';
  pfdata: any;
  ypdata: any;
  ddata: any[] = [];
  coinValue = 0;
  calculatedCoins = 0;
  qrDataUrl: SafeUrl = '';

  constructor(
    private api: AuthUserService,
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]], 
      transno: [''],
      note: ['Yohan Coins']
    });
  }

  ngOnInit(): void {
    (window as any).depositFundComponent = this;

    this.loadProfile();
    this.YohanPriceData();
  }

  // ---------------- Profile ----------------
  loadProfile(): void {
    this.api.Profile().subscribe({
      next: (res: any) => {
        this.pfdata = res?.data?.[0] || null;
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  // ---------------- Deposit History ----------------
  YohanPriceData() {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = parseFloat(this.ypdata.coinvalue);
      },
      error: (err) => {
        console.error('Error fetching Yohan price:', err);
      }
    });
  }

  formatAmount(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');

    if ((value.match(/\./g) || []).length > 1) {
      value = value.substring(0, value.length - 1);
    }

    if (value.includes('.')) {
      const [intPart, decPart] = value.split('.');
      if (decPart.length > 2) {
        value = intPart + '.' + decPart.substring(0, 2);
      }
    }

    event.target.value = value;
    this.form.get('amount')?.setValue(value, { emitEvent: false });

    const amount = parseFloat(value);
    this.calculatedCoins = (!isNaN(amount) && this.coinValue > 0) ? amount / this.coinValue : 0;
  }

  // ---------------- External JS Integration ----------------
  updateTxHashFromOutside(hash: string): void {
    console.log('🔗 Received TxHash from external JS:', hash);
    this.form.get('transno')?.setValue(hash);
  }

  // ---------------- Submit Deposit ----------------
  onSubmit(): void {
    if (!this.form.valid) {
      this.errorMessage = 'Please enter a valid deposit amount.';
      return;
    }

    const tx = this.form.value.transno?.trim();
    if (!tx) {
      this.errorMessage = 'Transaction hash is required before deposit.';
      return;
    }

    const payload = {
      amount: this.form.value.amount,
      transno: this.form.value.transno,
      note: this.form.value.note
    };

    console.log('📦 Deposit Payload:', payload);

    this.api.DepositWallet(payload).subscribe({
      next: (res: any) => {
        if (res?.status === true || res?.code === 200) {
          this.showSuccessModal();
        } else {
          this.errorMessage = res?.message || 'Deposit failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('❌ Deposit error:', err);
        this.errorMessage = err?.error?.message || 'Deposit request failed.';
      }
    });
  }

  // ---------------- Success Modal ----------------
  private showSuccessModal(): void {
    const modal = new bootstrap.Modal(this.successModal.nativeElement);
    modal.show();

    setTimeout(() => {
      modal.hide();
      this.reloadDepositPage();
    }, 2000);
  }

  // ---------------- Reload Page ----------------
  private reloadDepositPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/deposit']);
    });
  }
}
