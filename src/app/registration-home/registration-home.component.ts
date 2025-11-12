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

  coinValue = 0;
  convertedYohanCoins = 0;
  ypdata: any;

  registrationUSD = 6;
  loading: boolean = false;

  isLoading: boolean = true; // ✅ Preloader visibility

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

  ngOnInit(): void {
    (window as any).depositFundComponent = this;

    // ✅ Show preloader for 30 seconds
    setTimeout(() => {
      this.isLoading = false;
      this.YohanPriceData();
    }, 30000); // 30 seconds
  }

  ngAfterViewInit(): void {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
  }

  ngOnDestroy(): void {
    delete (window as any).depositFundComponent;
  }

  YohanPriceData(): void {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = Number(this.ypdata.coinvalue);
        if (this.coinValue > 0) {
          this.convertedYohanCoins = Number((this.registrationUSD / this.coinValue).toFixed(6));
          this.form.patchValue({ coins: this.convertedYohanCoins });
        }
      },
      error: (err) => console.error('Error fetching Yohan price:', err)
    });
  }

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

  updateTxHashFromOutside(txHash: string): void {
    this.form.patchValue({ transno: txHash });
  }

  onSubmit(): void {
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

  registerUser(): void {
    const data = this.form.value;
    this.loading = true;
    this.api.HomeRegistration(data).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.udata = res.adddata;
        this.successModal.show();
      },
      error: (err) => {
        this.loading = false;
        alert('Registration failed. Please try again.');
      }
    });
  }

  refreshPage(): void {
    this.successModal.hide();
    window.location.reload();
  }
}
