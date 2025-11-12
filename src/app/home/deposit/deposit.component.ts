import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class DepositComponent {
 
 @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  submitting = false;
  qrDataUrl: SafeUrl = '';
  qrCodeDataUrl: SafeUrl = '';
  paymentInfo: any = null;
  paymentAddress: string = '';
  checkingStatus = false;

  payments: any[] = [];
  ddata: any[] = [];
  ypdata: any;
  idData: any;

  alertMessage: string = '';
  alertType: string = '';
  errorMessage: string = '';

  coinValue: number = 0;
  calculatedCoins: number = 0;
  pfdata: any;

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

  ngOnInit() {
    (window as any).depositFundComponent = this; // expose to global
    this.DepositeData();
    this.YohanPriceData();
    this.getProfiledata();
  }

    getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      // console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

  

  DepositeData() {
    this.api.DepositeData().subscribe({
      next: (res: any) => {
        // console.log('dpreport',res);
        this.ddata = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching deposit data:', err);
        this.ddata = [];
      }
    });
  }

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
  this.calculatedCoins = (!isNaN(amount) && this.coinValue > 0)
    ? amount / this.coinValue
    : 0;
}


 onSubmit() {
  if (!this.form.valid) return;

  this.submitting = true;
  this.errorMessage = "";

  // ✅ Check if transno is empty
  const tx = this.form.value.transno?.trim();
  if (!tx || tx.length === 0) {
    this.errorMessage = "Transaction hash is required before deposit.";
    this.submitting = false;
    return;
  }

  const payload = {
    amount: this.form.value.amount,
    transno: this.form.value.transno,
    note: this.form.value.note
  };

  // console.log('🛠 Payload:', payload);

  this.api.DepositWallet(payload).subscribe({
    next: (res: any) => {

      // ✅ Check API success flag
      if (res?.status === true || res?.code === 200) {

        this.form.reset();
        this.idData = null;

        // ✅ Show success modal ONLY on valid API success
        const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
        modalElement.show();

        setTimeout(() => {
          modalElement.hide();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/deposit']);
          });
        }, 2000);

      } else {
        // ✅ API returned fail
        this.errorMessage = res?.message || "Deposit failed. Please try again.";
      }

      this.submitting = false;
    },

    error: (err) => {
      // ✅ Backend / Network failure
      this.errorMessage = err?.error?.message || "Deposit request failed.";
      this.submitting = false;
    }
  });
}



  updateTxHashFromOutside(hash: string) {
    this.form.get('transno')?.setValue(hash);
    // console.log('Transaction Hash updated in form:', hash);
  }

}
