import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pfdata: any;
  form: FormGroup;
  isEditing = false;
  showOtpForm = false;
  formOtp: FormGroup;
// Alert message
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success'; // success or danger
  constructor(
    private location: Location,
    private api: AuthUserService,
    private fb: FormBuilder,
    private token: TokenStorageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['',],
      password: [''],
      email: ['', ],
      wallet1: ['', ],
      securepin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    });

    this.formOtp = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProfiledata();
    this.form.disable(); // initially disabled
  }

  goBack() {
    this.location.back();
  }

  enableEdit() {
    this.isEditing = true;
    this.form.enable(); // allow editing
  }

  cancelEdit() {
    this.isEditing = false;
    this.showOtpForm = false;
    this.form.disable(); // lock fields
    this.form.patchValue({
       name: this.pfdata?.name,
      email: this.pfdata?.email,
      wallet1: this.pfdata?.wallet1,
      password: this.pfdata?.password,
      securepin: this.pfdata?.securepin,
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Step 1: Generate OTP
    this.api.GenerateOtp().subscribe((res: any) => {
      if (res.status === 1) {
        this.showOtpForm = true;
         this.showAlert('OTP sent to your registered email or phone.', 'success');
      } else {
        this.showAlert(res.message || 'OTP generation failed', 'danger');
      }
    });
  }

  verifyOtpAndSave() {
  if (this.formOtp.invalid) {
    this.formOtp.markAllAsTouched();
    return;
  }

  const otpPayload = { otp: this.formOtp.value.otp };

  this.api.VerifyOtp(otpPayload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.showOtpForm = false;
        this.updateProfile(); // update after OTP verified
        this.formOtp.reset();
            this.showAlert('OTP verified successfully. Updating profile...', 'success');
      } else {
   
         this.showAlert(res.message || 'Invalid OTP', 'danger');
      }
    },
    error: (err) => {
      console.error(err);

        this.showAlert(err.error?.message || 'OTP verification failed', 'danger');
    }
  });
}

    onPinInput(event: any) {
  const input = event.target as HTMLInputElement;
  // Remove all non-digit characters and trim to 4 digits
  const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 4);
  this.form.get('securepin')?.setValue(cleanValue, { emitEvent: false });
}


  updateProfile() {
    this.api.UpdateProfile(this.form.value).subscribe({
      next: (res: any) => {
        this.isEditing = false;
        this.form.disable(); // lock fields after save
        this.getProfiledata(); // reload data
            this.showAlert('Profile updated successfully!', 'success');
      },
      error: (err) => {
        console.error(err);
         this.showAlert('Failed to update profile', 'danger');
      }
    });
  }

  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
      this.form.patchValue({
        name: this.pfdata.name,
        password: '',
        wallet1: this.pfdata.wallet1,
        email: this.pfdata.email
      });
      this.form.disable(); // always disable by default
    });
  }

  signOut() {
    this.token.signOut();
  }

   private showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;

    // Auto-hide after 4 seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 2000);
  }



}
