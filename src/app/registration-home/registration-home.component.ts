import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-registration-home',
  templateUrl: './registration-home.component.html',
  styleUrls: ['./registration-home.component.scss']
})
export class RegistrationHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup;

  udata: any = null;
  regname = '';
  idselectmsg = '';
  errorMessage = '';

  walletAddress = '';
  successModal: any;

  coinValue = 0;              // Current Yohan coin price in USD
  convertedYohanCoins = 0;    // Calculated coin amount
  ypdata: any;

  registrationUSD = 6;        // $6 registration fixed amount

  loading: boolean = false;   // ✅ Added missing variable

  constructor(
    private fb: FormBuilder,
    private api: AuthUserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      walletaddress: [''],
      transno: [''],
      coins: [0]
    });
  }

  // ------------------------------------------------------------------
  // 🟢 Component Lifecycle
  // ------------------------------------------------------------------
  ngOnInit(): void {
    // ✅ expose component to global JS
    (window as any).depositFundComponent = this;

    // Fetch Yohan price initially
    this.YohanPriceData();

    // ✅ Listen for wallet events if Web3Modal present
    const modal = (window as any).web3modal;
    if (modal) {
      modal.subscribeEvents((account: any) => {
        this.walletAddress = account?.address || '';
        this.form.patchValue({ walletaddress: this.walletAddress });
      });
    }
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modal after view loaded
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
  }

  ngOnDestroy(): void {
    // Cleanup global reference when component destroyed
    delete (window as any).depositFundComponent;
  }

  // ------------------------------------------------------------------
  // 💰 Fetch current Yohan Coin price
  // ------------------------------------------------------------------
  YohanPriceData(): void {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = Number(this.ypdata.coinvalue);

        if (this.coinValue > 0) {
          this.convertedYohanCoins = Number((this.registrationUSD / this.coinValue).toFixed(6));
          this.form.patchValue({ coins: this.convertedYohanCoins });
        }

        console.log('🪙 Coin Value:', this.coinValue);
        console.log('💰 Converted Yohan:', this.convertedYohanCoins);
      },
      error: (err) => console.error('Error fetching Yohan price:', err)
    });
  }

  // ------------------------------------------------------------------
  // 🔍 Validate Sponsor ID
  // ------------------------------------------------------------------
  onRegisterIdSelect(event: any): void {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe({
      next: (res: any) => {
        if (res?.data?.length) {
          this.regname = res.data[0].name;
          this.idselectmsg = `Name: ${this.regname}`;
          this.errorMessage = '';
        } else {
          this.idselectmsg = 'Referral ID Not Available';
          this.regname = '';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error fetching data';
        this.idselectmsg = '';
      }
    });
  }

  // ------------------------------------------------------------------
  // 🔗 Called from External JS after transaction success
  // ------------------------------------------------------------------
  updateTxHashFromOutside(txHash: string): void {
    console.log('🔗 Received TxHash from JS:', txHash);
    this.form.patchValue({ transno: txHash });
  }

  // ------------------------------------------------------------------
  // 🚀 External JS triggers this after deposit complete
  // ------------------------------------------------------------------
  onSubmit(): void {
    console.log('✅ onSubmit() triggered from JS');

    if (!this.form.valid) {
      alert('Please fill all required fields before submitting.');
      return;
    }

    if (!this.form.value.transno) {
      alert('Transaction hash missing!');
      return;
    }

    this.registerUser();
  }

  // ------------------------------------------------------------------
  // 💾 Save registration to backend
  // ------------------------------------------------------------------
  registerUser(): void {
    const data = this.form.value;
    console.log('📦 Registration Payload:', data);

    this.loading = true;

    this.api.HomeRegistration(data).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.udata = res.adddata;
        console.log('✅ Registration Success:', res);
        this.successModal.show();
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  }

  // ------------------------------------------------------------------
  // 🔁 Refresh page after success
  // ------------------------------------------------------------------
  refreshPage(): void {
    this.successModal.hide();
    window.location.reload();
  }
}
