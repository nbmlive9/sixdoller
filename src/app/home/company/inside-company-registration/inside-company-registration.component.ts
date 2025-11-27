import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthUserService } from '../../service/auth-user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-inside-company-registration',
  templateUrl: './inside-company-registration.component.html',
  styleUrls: ['./inside-company-registration.component.scss']
})
export class InsideCompanyRegistrationComponent {

  form: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  successTransferModal: any;
loadingModal: boolean = false;
  idselectmsg: string = '';
  regname: any;
    idselectmsg1: string = '';
  regname1: any;
  errorMessage1='';
  constructor(private fb: FormBuilder, private router:Router, private api:AuthUserService ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      sponcerid: ['', Validators.required],
      name: ['', Validators.required],
      regid: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

   /** When user types or QR code fills regid */
  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4?.data?.length) {
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name}`;
          this.errorMessage = '';
        } else {
          this.regname = null;
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error?.message || 'Error fetching user data';
        this.regname = null;
        this.idselectmsg = '';
      }
    );
  }

  onRegisterIdSelect1(event: any) {
    const id = event.target.value;
    if (!id) return;

    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4?.data?.length) {
          this.regname1= res4.data[0];
          this.idselectmsg = `User Name: ${this.regname1.name}`;
          this.errorMessage1 = '';
        } else {
          this.regname1 = null;
          this.idselectmsg1 = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage1 = err.error?.message || 'Error fetching user data';
        this.regname1 = null;
        this.idselectmsg1 = '';
      }
    );
  }

  submitRegistration() {
      if (this.form.invalid) return;

  const payload = {
    email: this.form.value.email,
    sponcerid: this.form.value.sponcerid,
    name: this.form.value.name,
    regid: this.form.value.regid,
    password:this.form.value.password,
    
  };

  this.loadingModal = true;
  this.successMessage = '';
  this.errorMessage = '';

  this.successTransferModal.show(); // ✅ Open modal immediately

  this.api.InsideCompanyRegistration(payload).subscribe(
    (res: any) => {
      this.loadingModal = false;
      this.successMessage = 'Register successfully! ✅';
      this.form.reset();

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500); // ✅ Auto close after 3 sec
    },
    (err: any) => {
      this.loadingModal = false;
      this.errorMessage = 'Register failed. Please try again. ❌';

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500);
    }
  );
  }

    reloadComponent() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cregister']);
  });

}

}
