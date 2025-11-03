import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../home/service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as confetti from 'canvas-confetti';
declare var bootstrap: any; // ✅ Bootstrap instance
@Component({
  selector: 'app-referral-link-share',
  templateUrl: './referral-link-share.component.html',
  styleUrls: ['./referral-link-share.component.scss']
})
export class ReferralLinkShareComponent {

  form: FormGroup;
    udata: any;
    idselectmsg: string = '';
    regname: any;
    errorMessage = '';
  id:any;
  data1:any;
    private successModal: any;
  private errorModal: any;
    constructor(private fb: FormBuilder, private api: AuthUserService, private router:Router, private activeroute:ActivatedRoute) {
      this.form = this.fb.group({
        sponcerid: new FormControl('', ),
        name: new FormControl('', [Validators.required]),
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        terms: new FormControl('', [Validators.required]),
      });
    }
  
    ngOnInit() {
          this.id = this.activeroute.snapshot.params['regid'];
    this.api.UserNameDisplay(this.id).subscribe((res: any) => {
      if (res && res.data && res.data.length > 0) {
        this.data1 = res.data[0];
       this.form.get('sponcerid')!.setValue(this.data1.regid);
      }
    });
    }
  
 
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
        if (res) {
          this.udata = res.adddata;
          this.form.reset();
          // Redirect after 3s
           this.successModal.show();
         // Redirect after 6s
          setTimeout(() => {
            this.successModal.hide();
            this.router.navigateByUrl('/sign');
          }, 6000);
        }else {
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
