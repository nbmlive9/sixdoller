import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AuthUserService } from '../service/auth-user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    @ViewChild('successModal') successModal!: ElementRef;
form: FormGroup;
  submitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private api:AuthUserService, private router:Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      regid: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

 forgot() {
      const payload = {
        regid: this.form.value.regid,
         email: this.form.value.email,
      };
    
      this.api.forgotPassword(payload).subscribe({
        next: (res: any) => {
    
          // Reset the form
          this.form.reset();
    
          // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();
    
          // Automatically close modal and refresh page after 3 seconds
          setTimeout(() => {
            modalElement.hide(); // Close modal
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/forgot']); // Refresh the page
            });
          }, 3000); // 3000ms = 3 seconds
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Activation failed.';
        }
      });
    }


}
