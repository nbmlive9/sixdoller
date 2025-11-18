import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-withdraw-fund',
  templateUrl: './withdraw-fund.component.html',
  styleUrls: ['./withdraw-fund.component.scss']
})
export class WithdrawFundComponent {
  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  charges: number = 0;
  netAmount: number = 0;

  modalRef: any;
  loadingModal: boolean = false;
  ypdata: any;
  errorMessage1: string = '';
 coinValue: number = 0;
  calculatedCoins: number = 0;
    data2: any;
  data1: any;

  constructor(
    private api: AuthUserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      amount: new FormControl('', [Validators.required, Validators.min(5)])
    });
  }

  ngOnInit() {
    this.getProfileData();
       this.YohanPriceData();
       this.GetDashboardData();
  }

  ngAfterViewInit() {
    if (this.successModal) {
      this.modalRef = new bootstrap.Modal(this.successModal.nativeElement);
    }
  }

  getProfileData() {
    this.api.Profile().subscribe((res: any) => {
      // console.log('profile',res);
      this.data2 = res.data[0];
    });
  }

    GetDashboardData() {
    this.api.DashboardData().subscribe((res: any) => {
      // console.log('dash',res);
      this.data1 = res.data;
    });
  }


calculateNetAmount() {
  const amount = parseFloat(this.form.value.amount) || 0;

  if (amount >= 5) {
    this.charges = amount * 0.10;        // 10% charge
    this.netAmount = amount - this.charges;  // only for display
  } else {
    this.charges = 0;
    this.netAmount = 0;
  }
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
    this.calculatedCoins = (!isNaN(amount) && this.coinValue > 0) ? amount / this.coinValue : 0;
  }

  Withdraw() {
    if (this.form.invalid) return;

    const amount = this.form.value.amount;
    const recipient = this.data2?.wallet1;

    if (!recipient || recipient.trim() === '') {
      this.errorMessage = 'Wallet address not found in profile';
      this.successMessage = '';
      this.modalRef.show();
      return;
    }

    const payload = { recipient, amount, flag: 1 };
    this.loadingModal = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.modalRef.show();

    this.api.withdrawToBlockchain(payload).subscribe({
    next: (res: any) => {
  console.log("Withdraw Response:", res);
  this.loadingModal = false;

  const isSuccess =
    res.status === "success" ||     // your backend format
    res.success === true ||
    res.message?.toLowerCase().includes("success");

  if (isSuccess) {
    this.successMessage = `Withdraw Successfully...`;
    this.errorMessage = '';
    this.form.reset();
    this.charges = 0;
    this.netAmount = 0;

    setTimeout(() => {
      this.modalRef.hide();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/withdrawreport']);
      });
    }, 1500);

  } else {
    this.errorMessage = res.error || res.message || 'Withdraw failed.';
    this.successMessage = '';
  }
},

      error: (err) => {
        console.error(err);
        this.loadingModal = false;
        this.errorMessage = 'MINIMUM WIthdraw ABOVE $5 or Insufficient Funds';
        this.successMessage = '';
      }
    });
  }
}
