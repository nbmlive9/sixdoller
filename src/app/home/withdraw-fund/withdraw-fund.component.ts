import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../service/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-fund',
  templateUrl: './withdraw-fund.component.html',
  styleUrls: ['./withdraw-fund.component.scss']
})
export class WithdrawFundComponent {
form:FormGroup;
pfdata:any;
successMessage: string = '';
errorMessage: string = '';
data1:any;
  constructor(private api:AuthUserService, private fb:FormBuilder, private router:Router){
       this.form = this.fb.group({
              amount: new FormControl('', [Validators.required]),
            });
  }

  ngOnInit(){
    this.getProfiledata();
    this.Pendingwithdarw();
  }

   getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      // console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

     Pendingwithdarw(){
    this.api.PendingWithdraw().subscribe((res:any)=>{
      // console.log('pending',res);
      this.data1=res.data;
    })
  }

  Withdraw(){
      // console.log(this.form.value);
      if (this.form.valid) {
        const val = {
          amount: this.form.value.amount
        };
        this.api.WithdrawFunds(val).subscribe(
          (a:any) => {
            if (a) {
              // console.log(a);
                 this.form.reset();
                  this.successMessage = 'Successfully Withdraw Amount';
          this.errorMessage = '';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/dashboard']);
        });
      }, 1000);
            } else {
              // console.log(a);
               this.form.markAllAsTouched();
              this.successMessage = '';
          this.errorMessage = '❌ Withdraw failed. Please try again.';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/selftransfer']);
        });
      }, 1000);
            }
          },
          (err: any) => {
              this.successMessage = '';
          this.errorMessage = 'Insufficient Funds....';
          },
        );
      }
    }

}
