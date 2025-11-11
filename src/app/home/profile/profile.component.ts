import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pfdata: any;
  form: FormGroup;
  isEditing = false;

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
      name: [''],
      password: [''],
      email: [''],
      wallet1: [''],
      securepin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
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
    this.form.disable(); // lock fields
    this.form.patchValue({
      name: this.pfdata?.name,
      email: this.pfdata?.email,
      wallet1: this.pfdata?.wallet1,
      password: '',
      securepin: this.pfdata?.securepin,
    });
  }

  save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.api.UpdateProfile(this.form.value).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.isEditing = false;
        this.form.disable(); // lock fields

        // Refresh profile data
        this.getProfiledata();

        // Show success modal
        const modalEl = document.getElementById('successModal');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      } else {
        this.showModalMessage(res.message || 'Failed to update profile', 'danger');
      }
    },
    error: (err) => {
      console.error(err);
      this.showModalMessage('Failed to update profile', 'danger');
    }
  });
}

showModalMessage(message: string, type: 'success' | 'danger') {
  const modalEl = document.getElementById('successModal');
  if (modalEl) {
    modalEl.querySelector('.modal-body')!.innerHTML = message;
    const header = modalEl.querySelector('.modal-header') as HTMLElement;
    header.className = type === 'success' ? 'modal-header bg-success text-white' : 'modal-header bg-danger text-white';
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}


  onPinInput(event: any) {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 4);
    this.form.get('securepin')?.setValue(cleanValue, { emitEvent: false });
  }

  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
      this.form.patchValue({
        name: this.pfdata.name,
        password: '',
        wallet1: this.pfdata.wallet1,
        email: this.pfdata.email,
        securepin: this.pfdata.securepin
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

    // Auto-hide after 2 seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 2000);
  }
}
