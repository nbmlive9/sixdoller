import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  // Payment-related
  qrDataUrl: SafeUrl = '';
  paymentInfo: any = null;
  paymentAddress: string = '';
  qrCodeDataUrl: SafeUrl = '';
  checkingStatus = false;
  payments: any[] = [];

  // State
  loading = false;
  loadingTxns = false;   // ✅ for showing spinner on transactions
  errorMsg = '';
  ddata: any = [];
  alertMessage: string = '';
  alertType: string = '';
  pdata: any;
 timer: any;
  countdown = 0;           // Timer counter
  showTimer = false; 
  constructor(
    private location: Location,
    private api: AuthUserService,
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      amount: [''],
      transno: [''],
      note: ['nowpayments url']
    });
  }

  Back() {
    this.location.back();
  }
  ngOnInit() {
    this.loadPayments();

    this.loadingTxns = true;
    this.api.DepositeData().subscribe({
      next: (res: any) => {
        // console.log('depositdata', res);
        this.ddata = res.data || [];
        this.loadingTxns = false;
      },
      error: (err: any) => {
        console.error('DepositData error', err);
        this.ddata = [];
        this.loadingTxns = false;
      }
    });

    this.api.Profile().subscribe((res: any) => {
      // console.log(res);
      this.pdata = res.data[0];
    });
  }

  loadPayments() {
    this.loading = true;
    this.errorMsg = '';

    const token = this.token.getToken();
    if (!token) {
      this.errorMsg = 'No token found. Please login again.';
      this.loading = false;
      return;
    }

    // Uncomment if you want to fetch payments
    // this.api.getPayments(token).subscribe({
    //   next: (res: any) => {
    //     console.log('Payments data:', res);
    //     this.payments = res.data || [];
    //     this.loading = false;
    //   },
    //   error: (err: any) => {
    //     console.error('Payment history error:', err);
    //     this.errorMsg = 'Failed to fetch payment history.';
    //     this.loading = false;
    //   }
    // });
  }

  /** Step 1: Generate NOWPayments invoice */
  generatePayment() {
    if (this.form.invalid) return;

    this.submitting = true;
    const amount = Number(this.form.value.amount);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'FTC8KFS-VK74HTA-QJWY16M-NJ9C6JN'
    });

    this.http.post<any>('https://api.nowpayments.io/v1/payment', {
      price_amount: amount,
      price_currency: 'usd',
      pay_currency: 'usdtbsc',
      ipn_callback_url: 'https://bitraze.org/payment/callback'
    }, { headers }).subscribe({
      next: (res) => {
        // console.log('Payment details', res);
        this.paymentInfo = res; // save payment info for QR & status check
        this.submitting = false;
      },
      error: (err) => {
        console.error(err);
        this.submitting = false;
      }
    });
  }

  /** Step 3: Call backend API to credit wallet */
  onSubmit(amount: number, transno: string) {
  if (!amount || !transno) {
    console.error('Invalid amount or transaction number', amount, transno);
    alert('Invalid payment data received.');
    return;
  }

  this.submitting = true;

  const payload = {
    amount: amount.toString(), // ✅ ensure it's a string
    transno: transno,          // ✅ NOWPayments payment_id
    note: this.form.value.note || 'NOWPayments deposit'
  };

  this.api.DepositWallet(payload).subscribe({
    next: (res) => {
      // console.log('Wallet updated:', res);
      this.submitting = false;

      //alert('Wallet credited successfully 🎉');
      this.paymentInfo = null;
      this.form.reset();

      // ✅ Force reload /deposit route
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/deposit']);
      });
    },
    error: (err) => {
      console.error('Deposit error:', err);
      this.submitting = false;
    }
  });
}

 startCountdown(seconds: number) {
    this.countdown = seconds;
    this.showTimer = true;

    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
        this.showTimer = false; // hide timer when finished
      }
    }, 1000);
  }

  // 📋 Copy Address
  copyAddress() {
    if (this.paymentInfo?.pay_address) {
      navigator.clipboard.writeText(this.paymentInfo.pay_address).then(() => {
      });
    }
  }

  // 📲 Share on WhatsApp
  shareOnWhatsApp() {
    if (!this.paymentInfo) return;
    const message = `Send Only USDT BEP20 for $${this.paymentInfo.price_amount} Deposit\n\nWallet Address:\n${this.paymentInfo.pay_address}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  /** Step 2: Check payment status */
  checkPaymentStatus() {
  this.checkingStatus = true;
  if (!this.paymentInfo?.payment_id) return;

  const headers = new HttpHeaders({
    'x-api-key': 'FTC8KFS-VK74HTA-QJWY16M-NJ9C6JN'
  });

  this.http.get<any>(
    `https://api.nowpayments.io/v1/payment/${this.paymentInfo.payment_id}`,
    { headers }
  ).subscribe({
    next: (res) => {
      this.checkingStatus = false;
      // console.log('Payment status:', res);

         this.startCountdown(60);
      if (res.payment_status === 'finished') {
        this.alertType = 'success';
        this.alertMessage = 'Deposit successful! ✅';

        // ✅ Use outcome_amount here
        this.onSubmit(res.outcome_amount, res.payment_id);

      } else if (res.payment_status === 'failed') {
        this.alertType = 'danger';
        this.alertMessage = 'Payment failed ❌. Please try again.';

      } else {
        this.alertType = 'warning';
        this.alertMessage = 'Payment is still pending ⏳. Wait for 2 min..';
      }
    },
    error: (err) => {
      console.error(err);
      this.checkingStatus = false;
      this.alertType = 'danger';
      this.alertMessage = 'Error checking payment status. Please try again later.';
    }
  });
}


  formatAmount(event: any) {
    let value = event.target.value;

    // allow only digits and decimal
    value = value.replace(/[^0-9.]/g, '');

    // restrict to one decimal point
    if ((value.match(/\./g) || []).length > 1) {
      value = value.substring(0, value.length - 1);
    }

    // restrict to 2 decimal places
    if (value.includes('.')) {
      const [intPart, decPart] = value.split('.');
    }}}
