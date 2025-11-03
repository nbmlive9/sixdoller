import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.scss']
})
export class SelfTransferComponent {

    pfdata:any;
    idselectmsg: string = '';
  regname:any;
    form:FormGroup;
    tdata:any;
      qrCodeValue: string = '';
          successMessage: string = '';
errorMessage: string = '';
 selectedWallet: string = '';
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder, private route:ActivatedRoute, private router:Router) {
     this.form = this.fb.group({
          amount: new FormControl('', [Validators.required]),
          waltype:new FormControl('',),
        });
  }
  Back() {
  this.location.back();
}

ngOnInit(){
  this.getProfiledata();
  this.api.TransferWalletReport().subscribe((res:any)=>{
    //  console.log('transfer',res);
     this.tdata=res.data;
  })
}

 getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      // console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

 openTransferModal(wallet: string) {
    this.selectedWallet = wallet;
    this.form.patchValue({ waltype: wallet, amount: '' });
    const modal = new bootstrap.Modal(document.getElementById('transferModal'));
    modal.show();
  }

  Transfer(){
      // console.log(this.form.value);
      if (this.form.valid) {
        const val = {
          amount: this.form.value.amount,
          waltype:this.form.value.waltype
        };
        this.api.SelfTransferWallet(val).subscribe(
          (a:any) => {
            if (a) {
              // console.log(a);
                 this.form.reset();
                  this.successMessage = 'Successfully Transfer Amount';
          this.errorMessage = '';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/selftransfer']);
        });
      }, 2000);
            } else {
              // console.log(a);
               this.form.markAllAsTouched();
              this.successMessage = '';
          this.errorMessage = '❌ Self Transfer failed. Please try again.';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/selftransfer']);
        });
      }, 2000);
            }
          },
          (err: any) => {
            // this.errorMessage = a.msg.message;
          },
        );
      }
    }

  
}
