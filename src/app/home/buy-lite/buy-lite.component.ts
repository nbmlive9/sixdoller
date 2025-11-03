import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-buy-lite',
  templateUrl: './buy-lite.component.html',
  styleUrls: ['./buy-lite.component.scss']
})
export class BuyLiteComponent {
  adata:any;
  form: FormGroup;
  pack:any;
  pdata: any = {};
row: any;
 showSuccess: boolean = false;
showError: boolean = false;
    successMessage: string = '';
errorMessage: string = '';
  //form1:FormGroup;
  constructor(private location: Location, private api:AuthUserService, private fb:FormBuilder, private router:Router) {
      this.form = this.fb.group({
      package: new FormControl('1'),
      regid: new FormControl(''),
       });
  }
  Back() {
  this.location.back();
}
ngOnInit(){
  this.loadData();
 
}

  loadData() {
    this.getpackages();
    this.api.ActivationData().subscribe((res: any) => {
      this.adata = res.data.sort((a: any, b: any) => new Date(b.cdate).getTime() - new Date(a.cdate).getTime());
    });
    this.api.Profile().subscribe((res: any) => {
      this.pdata = res.data[0];
      this.form.patchValue({ regid: this.pdata.regid });
    });
  }


getpackages() {
  this.api.GetPackages().subscribe((res: any) => {
    // console.log('packages', res);

    // ✅ Filter only lite packages
    this.pack = res.data.filter((pkg: any) => pkg.ptype === 'lite');
  });
}

submitAction() {
  // console.log(this.form.value);

  if (this.form.valid) {
    const val = {
      package: this.form.value.package,
      regid: this.form.value.regid,
    };
    if (this.pdata.topupstatus == '0') {
      // Call Activation
      this.api.Activation(val).subscribe(
        (res: any) => {
          // console.log('Activation response:', res);
          this.form.reset();
          this.successMessage = '✅ Package Purchased successfully!';
            this.errorMessage = '';

      setTimeout(() => {
        this.showSuccess = false;
        this.router.navigateByUrl('/bitraze-lite'); // reload component
      }, 1000);
        },
        (err: any) => {
          console.error('Activation error:', err);
                this.successMessage = '';
          this.errorMessage = '❌ Package Purchased failed. Please try again.';

      setTimeout(() => {
        this.showError = false;
      }, 1000);
        }
      );
    } else if (this.pdata.topupstatus == '1') {
      // Call Topup
      this.api.Topup(val).subscribe(
        (res: any) => {
          // console.log('Topup response:', res);
          this.form.reset();
            this.successMessage = '✅ Package Purchased successfully!';
            this.errorMessage = '';
              setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/bitraze-lite']);
        });
      }, 2000);
        },
        (err: any) => {
          console.error('Topup error:', err);
          this.successMessage = '';
          this.errorMessage = '❌ Package Purchased failed. Please try again.';
            setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/bitraze-lite']);
        });
      }, 2000);
        }
      );
    }
  } else {
    this.form.markAllAsTouched();
  }
}

openModal(pkg: any) {
  // ✅ Update form with selected package
  this.form.patchValue({
    package: pkg.id,
    regid: this.pdata.regid
  });

  // ✅ Update readonly amount input
  const input = document.getElementById('amountInput') as HTMLInputElement;
  if (input) {
    input.value = pkg.amount;
  }
}


getPackageClass(p: any) {
  switch (p.ptype) {
    case 'lite': return 'bg-gradient-green';
    default: return 'bg-gradient-green';
  }
}

}
