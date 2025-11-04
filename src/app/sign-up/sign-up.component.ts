import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import * as confetti from 'canvas-confetti';
import { Router } from '@angular/router';

declare var bootstrap: any; // ✅ Bootstrap instance

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
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

  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router) {
    this.form = this.fb.group({
      sponcerid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
  this.getProfiledata();
  }

    getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
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

  // 🔹 Submit form
  userSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;

    this.api.UserRegistration(val).subscribe(
      (res: any) => {
        console.log('regdata',res);
        if (res?.adddata) {
          this.udata = res.adddata;
          this.form.reset();
          this.successModal.show();
        } else {
          this.showErrorModal('Registration failed. Please try again.');
        }
      },
      (err: any) => {
        this.showErrorModal(err.error?.message || 'Registration failed');
      }
    );
  }

  showErrorModal(message: string) {
    this.errorMessage = message;
    if (this.errorModal) this.errorModal.show();
  }


}
