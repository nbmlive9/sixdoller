import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-add-missliance',
  templateUrl: './add-missliance.component.html',
  styleUrls: ['./add-missliance.component.scss']
})
export class AddMisslianceComponent {

   pfdata: any;
  idselectmsg: string = '';
  regname: any;
  successMessage: string = '';
  errorMessage: string = '';
  form: FormGroup;
  tdata: any = [];


  successTransferModal: any;
loadingModal: boolean = false;

  constructor(
    private api: AuthUserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      amount: new FormControl('', [Validators.required]),
      remark:new FormControl('',[Validators.required]),
    });
  }


  ngOnInit() {
 
    this.getProfiledata();
    this.loadTransferTransactions();
  }

  /** Load Profile Data */
  getProfiledata() {
    this.api.Profile().subscribe((res: any) => {
      this.pfdata = res.data[0];
    });
  }

  /** Load Transfer Transactions */
  loadTransferTransactions() {
    this.api.GetMisllianceData().subscribe((res: any) => {
      this.tdata = res.data;
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


  ngAfterViewInit() {
  const modalEl = document.getElementById('successTransferModal');
  if (modalEl) {
    this.successTransferModal = new bootstrap.Modal(modalEl);
  }
}

  /** Transfer Amount */
 Transfer() {
  if (this.form.invalid) return;

  const payload = {
    amount: this.form.value.amount,
    remark: this.form.value.remark,
  };

  this.loadingModal = true;
  this.successMessage = '';
  this.errorMessage = '';

  this.successTransferModal.show(); // ✅ Open modal immediately

  this.api.AddMislliance(payload).subscribe(
    (res: any) => {
      this.loadingModal = false;
      this.successMessage = 'Amount Add successfully! ✅';
      this.form.reset();
      this.loadTransferTransactions();

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500); // ✅ Auto close after 3 sec
    },
    (err: any) => {
      this.loadingModal = false;
      this.errorMessage = 'Transfer failed. Please try again. ❌';

      setTimeout(() => {
        this.successTransferModal.hide();
        this.reloadComponent();
      }, 1500);
    }
  );
}


  reloadComponent() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/addexpensive']);
  });
}

}
