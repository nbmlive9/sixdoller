import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-referral-link-share',
  templateUrl: './referral-link-share.component.html',
  styleUrls: ['./referral-link-share.component.scss']
})
export class ReferralLinkShareComponent {
 form: FormGroup;

  udata: any = null;
  regname: string = '';
  idselectmsg = '';
  errorMessage = '';

  walletAddress = '';

  txHash = '';
  paymentDone = false;

  loading = false;
  successModal: any;

  coinValue = 0; // Current Yohan price in USD
  ypdata: any;

  registrationUSD = 6;
  data1: any;
  id: any;
convertedYohanCoins: number = 0;
  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router, private activeroute:ActivatedRoute) {
    this.form = this.fb.group({
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      transno: [''],
      walletaddress: [''],
      coins: [''],
    });
  }

  ngOnInit() {
    this.YohanPriceData();
              this.id = this.activeroute.snapshot.params['regid'];
    this.api.UserNameDisplay(this.id).subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        this.data1 = res.data[0];
       this.form.get('sponcerid')!.setValue(this.data1.regid);
      }
    });
  }

  ngAfterViewInit() {
    this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
  }

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
      (err: any) => {
        this.errorMessage = err.error?.message || 'Error fetching data';
        this.idselectmsg = '';
      }
    );
  }

  
    // Register user (without amount)
    registerUser() {
      this.loading = true;
      this.successModal.show();
  
      const data = {
        sponcerid: this.form.value.sponcerid,
        name: this.form.value.name,
        email: this.form.value.email,
        transno: this.form.value.transno
      };
  
      this.api.HomeRegistration(data).subscribe({
        next: (res: any) => {
          this.udata = res.adddata;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          alert("Registration failed");
        }
      });
    }
  
    refreshPage() {
      this.successModal.hide();
      window.location.reload();
    }

}
