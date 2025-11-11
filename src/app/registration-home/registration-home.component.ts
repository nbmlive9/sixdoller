import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-registration-home',
  templateUrl: './registration-home.component.html',
  styleUrls: ['./registration-home.component.scss']
})
export class RegistrationHomeComponent implements OnInit, AfterViewInit {

  form: FormGroup;

  udata: any = null;
  regname: string = '';
  idselectmsg = '';
  errorMessage = '';

  walletAddress = '';
  signer: any;

  loading = false;
  successModal: any;

  coinValue = 0; // Current Yohan price in USD
  ypdata: any;

  registrationUSD = 6; // $6 registration
convertedYohanCoins: number = 0;
 

  constructor(
    private fb: FormBuilder,
    private api: AuthUserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      transno: [''],
      walletaddress: [''],
       coins: this.convertedYohanCoins,
    });
  }

  ngOnInit() {
    this.YohanPriceData();

    // Subscribe wallet events if Web3Modal is injected
    const modal = (window as any).web3modal;
    if (modal) {
      modal.subscribeEvents((account: any) => {
        this.walletAddress = account?.address || '';
        this.form.patchValue({ walletaddress: this.walletAddress });
      });
    }
  }

  ngAfterViewInit() {
    this.successModal = new bootstrap.Modal(
      document.getElementById('successModal')
    );
  }

  // Fetch current Yohan coin price
YohanPriceData() {
  this.api.YohanPrice().subscribe({
    next: (res: any) => {
      this.ypdata = res.data;
      this.coinValue = Number(this.ypdata.coinvalue);
      if (this.coinValue > 0) {
        this.convertedYohanCoins = Number((6 / this.coinValue).toFixed(6));
      }

      console.log("Coin Value:", this.coinValue);
      console.log("Converted Yohan:", this.convertedYohanCoins);
    },
    error: (err) => console.error(err)
  });
}


  // Validate Sponsor ID
  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res: any) => {
        if (res?.data?.length) {
          this.regname = res.data[0].name;
          this.idselectmsg = `Name: ${this.regname}`;
          this.errorMessage = '';
        } else {
          this.idselectmsg = 'Referral ID Not Available';
          this.regname = '';
        }
      },
      (err) => {
        this.errorMessage = err.error?.message || 'Error fetching data';
        this.idselectmsg = '';
      }
    );
  }


  // Save registration to backend
  async registerUser() {
    this.successModal.show();

    const data = {
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      email: this.form.value.email,
      transno: this.form.value.transno,
      walletaddress: this.form.value.walletaddress,
      coins: this.form.value.coins,
    };

    this.api.HomeRegistration(data).subscribe({
      next: (res: any) => {
        this.udata = res.adddata;
      },
      error: (err) => {
        console.error(err);
        alert("Registration failed");
      }
    });
  }

  // Refresh page after success
  refreshPage() {
    this.successModal.hide();
    window.location.reload();
  }
}
