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
  idselectmsg: string = '';
  regname: any;
  errorMessage = '';

  private successModal: any;
  private errorModal: any;

  constructor(private fb: FormBuilder, private api: AuthUserService, private router: Router) {
    this.form = this.fb.group({
      sponcerid: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Initialize Bootstrap modals
    const successEl = document.getElementById('successModal');
    const errorEl = document.getElementById('errorModal');

    if (successEl) {
      this.successModal = new bootstrap.Modal(successEl);
      successEl.addEventListener('shown.bs.modal', () => {
        this.launchConfetti();
      });
    }

    if (errorEl) {
      this.errorModal = new bootstrap.Modal(errorEl);
    }
  }

  // 🔹 Get sponsor details by ID
  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.UserNameDisplay(id).subscribe(
      (res4: any) => {
        if (res4?.data?.length) {
          this.regname = res4.data[0];
          this.idselectmsg = `Name: ${this.regname.name}`;
          this.errorMessage = '';
        } else {
          this.regname = null;
          this.idselectmsg = 'Referral ID Not Available';
          this.errorMessage = 'Invalid Referral ID';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message || 'Error fetching user data';
        this.regname = null;
        this.idselectmsg = '';
      }
    );
  }

  // 🔹 Submit form and handle modals
  userSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = {
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.api.UserRegistration(val).subscribe(
      (res: any) => {
        if (res?.adddata) {
          this.udata = res.adddata;
          this.form.reset();
          // Show success modal
          this.successModal.show();
         // Redirect after 6s
          setTimeout(() => {
            this.successModal.hide();
            this.router.navigateByUrl('/sign');
          }, 6000);
        } else {
          this.showErrorModal('Registration failed. Please try again.');
        }
      },
      (err: any) => {
        this.showErrorModal(err.error?.message || 'Registration failed');
      }
    );
  }

  // 🔹 Show error modal
  showErrorModal(message: string) {
    this.errorMessage = message;
    if (this.errorModal) {
      this.errorModal.show();
    }
  }

  // 🔹 Confetti effect
  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const myConfetti = (confetti as any).create(canvas, { resize: true, useWorker: true });

    // Blast once
    myConfetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Stream for 2 seconds
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      myConfetti({
        particleCount: 6,
        spread: 70,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}
