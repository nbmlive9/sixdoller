import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
forgotForm:FormGroup;
  isLoggedIn = false;
  isForgotPassword = false;
  successMessage = '';
  errorMessage = '';
  constructor(private api:UserService, private fb:FormBuilder, private router:Router){
        this.forgotForm = this.fb.group({
          regid: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        });
  }

  ngOnInit(){}

  
sendForgotPassword(){
      // console.log(this.form.value);
      if (this.forgotForm.valid) {
        const val = {
          regid: this.forgotForm.value.regid,
          email:this.forgotForm.value.email
        };
        this.api.forgotPassword(val).subscribe(
          (a:any) => {
            if (a) {
              // console.log(a);
                 this.forgotForm.reset();
                  this.successMessage = 'Successfully forgot Password';
          this.errorMessage = '';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/forgot']);
        });
      }, 1000);
            } else {
              // console.log(a);
               this.forgotForm.markAllAsTouched();
              this.successMessage = '';
          this.errorMessage = '❌ forgot Password failed. Please try again.';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/forgot']);
        });
      }, 1000);
            }
          },
          (err: any) => {
            // this.errorMessage = a.msg.message;
          },
        );
      }
    }


}
