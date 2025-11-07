import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-royalty-users-data',
  templateUrl: './royalty-users-data.component.html',
  styleUrls: ['./royalty-users-data.component.scss']
})
export class RoyaltyUsersDataComponent {
  stdata: any;
  sldata: any;
  gdata: any;
  ddata: any;

  // Form for payment
  paymentForm: FormGroup;

  // Modal references
  modalRef: any;
  loadingModal: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private api: AuthUserService, private fb: FormBuilder,  private router: Router) {
    this.paymentForm = this.fb.group({
      usertype: new FormControl('star', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngAfterViewInit() {
    const modalEl = document.getElementById('paymentModal');
    if (modalEl) this.modalRef = new bootstrap.Modal(modalEl);
  }

  // Load users
  loadAllUsers() {
    this.api.StarRoyalUsers().subscribe((res: any) => { this.stdata = res.data; });
    this.api.SilverRoyalUsers().subscribe((res: any) => { this.sldata = res.data; });
    this.api.GoldRoyalUsers().subscribe((res: any) => { this.gdata = res.data; });
    this.api.DiamondRoyalUsers().subscribe((res: any) => { this.ddata = res.data; });
  }

  // Submit Payment
  
  submitPayment() {
  if (this.paymentForm.invalid) return;

  const { usertype, regid, amount } = this.paymentForm.value;
  this.loadingModal = true;
  this.successMessage = '';
  this.errorMessage = '';
  this.modalRef.show();

  let apiCall;

  switch (usertype) {
    case 'star': apiCall = this.api.StarPay({ amount }); break;
    case 'silver': apiCall = this.api.SilverPay({ amount }); break;
    case 'gold': apiCall = this.api.GoldPay({ amount }); break;
    case 'diamond': apiCall = this.api.DiamondPay({ amount }); break;
    default: return;
  }

  apiCall.subscribe(
    (res: any) => {
      this.loadingModal = false;
      this.successMessage = `✅ Payment of $${amount} to ${regid} successful!`;
      this.errorMessage = '';
      this.paymentForm.reset();
      setTimeout(() => {
        this.modalRef.hide();
        this.reloadComponent(); // ✅ reload full component
      }, 3000);
    },
    (err: any) => {
      this.loadingModal = false;
      this.successMessage = '';
      this.errorMessage = `❌ Payment failed. Please try again.`;
      setTimeout(() => {
        this.modalRef.hide();
        this.reloadComponent(); // reload even on failure if needed
      }, 3000);
    }
  );
}

// Reload full component
reloadComponent() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/cproyaltyusers']);
  });
}

}
