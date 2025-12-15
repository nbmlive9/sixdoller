import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import * as confetti from 'canvas-confetti';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

declare var bootstrap: any; // ✅ Bootstrap instance

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  udata: any = null;
  regname: any = '';
  idselectmsg = '';
  errorMessage = '';

  successModal: any;
 errorModal: any;
  pfdata: any;
loading: boolean = false;
  ypdata: any;
    coinValue = 0;
  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      sponcerid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      coins: [''],
    });
    
  }

  ngOnInit() {
  this.getProfiledata();
      this.YohanPriceData();
  this.form.get('sponcerid')?.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter(val => !!val)
  ).subscribe(id => {
    this.fetchSponsorName(id);
  });
  }



    YohanPriceData() {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = Number(this.ypdata.coinvalue);
        console.log("Coin Value:", this.coinValue);
      },
      error: (err) => console.error(err)
    });
  }

getProfiledata(){
  this.api.Profile().subscribe((res:any)=>{
    this.pfdata = res.data[0];

    // ✅ FORCE UI UPDATE
    this.cdr.markForCheck();
  });
}

  ngAfterViewInit() {
    const successEl = document.getElementById('successModal');
    const errorEl = document.getElementById('errorModal');

    if (successEl) this.successModal = new bootstrap.Modal(successEl);
    if (errorEl) this.errorModal = new bootstrap.Modal(errorEl);
  }

  // 🔹 Get sponsor name by ID
  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res: any) => {
        if (res?.data?.length) {
          this.regname = res.data[0].name;
          this.idselectmsg = `Sponsor Name: ${this.regname}`;
          // ✅ FORCE UI UPDATE
this.cdr.markForCheck();
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

  fetchSponsorName(id: string) {
  this.api.UserNameDisplay(id).subscribe({
    next: (res: any) => {
      if (res?.data?.length) {
        this.regname = res.data[0].name;
        this.idselectmsg = `Sponsor Name: ${this.regname}`;
        this.errorMessage = '';
      } else {
        this.idselectmsg = 'Referral ID Not Available';
        this.regname = '';
      }

      // ✅ IMPORTANT
      this.cdr.markForCheck();
    },
    error: () => {
      this.errorMessage = 'Invalid Sponsor ID';
      this.idselectmsg = '';
      this.cdr.markForCheck();
    }
  });
}


  
userSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.udata = null;

  const usdAmount = 6;
  const yohanCoinAmount = (usdAmount / this.coinValue).toFixed(6);
  this.form.patchValue({ coins: yohanCoinAmount });

  this.api.UserRegistration(this.form.value).subscribe({
    next: (res: any) => {
      this.loading = false;

      if (res?.adddata) {
        this.udata = res.adddata;
        this.successModal.show(); // ✅ SHOW HERE
        this.form.reset();
      } else {
        this.showErrorModal('Registration failed');
      }
    },
    error: (err) => {
      this.loading = false;
      this.showErrorModal(err.error?.message || 'Registration failed');
    }
  });
}



refreshPage() {
  this.successModal.hide();
  this.form.reset();
  this.udata = null;
}



  showErrorModal(message: string) {
    this.errorMessage = message;
    if (this.errorModal) this.errorModal.show();
  }


}
