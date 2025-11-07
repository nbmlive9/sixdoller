import { Component, AfterViewInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-cpdashboard',
  templateUrl: './cpdashboard.component.html',
  styleUrls: ['./cpdashboard.component.scss']
})
export class CpdashboardComponent implements AfterViewInit {
  ypdata: any;
  data1: any;
  form: FormGroup;
  loadingModal: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  updateCoinModal: any;

  constructor(private api: AuthUserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      coinvalue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.yohanprice();
    this.cpDashboardData();
  }

  ngAfterViewInit() {
    const modalEl = document.getElementById('updateCoinModal');
    if (modalEl) {
      this.updateCoinModal = new bootstrap.Modal(modalEl);
    }
  }

  yohanprice() {
    this.api.YohanAdminPrice().subscribe((res: any) => {
      this.ypdata = res.data;
    });
  }

  cpDashboardData() {
    this.api.CompanyDashboard().subscribe((res: any) => {
      console.log('data',res);
      this.data1 = res.data;
    });
  }

  // ✅ Open modal when "Update" button is clicked
  openUpdateModal() {
    this.form.reset({ coinvalue: this.ypdata?.coinvalue || '' }); // pre-fill current coin value
    this.successMessage = '';
    this.errorMessage = '';
    this.updateCoinModal.show();
  }

  // ✅ Submit updated coin value
  submitCoinUpdate() {
    if (this.form.invalid) return;

    const payload = { coinvalue: this.form.value.coinvalue };
    this.loadingModal = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.api.UpdateCoinValueData(payload).subscribe(
      (res: any) => {
        this.loadingModal = false;
        this.successMessage = 'Coin Value updated successfully! ✅';
        this.yohanprice(); // refresh current coin value
        setTimeout(() => this.updateCoinModal.hide(), 1500);
      },
      (err: any) => {
        this.loadingModal = false;
        this.errorMessage = 'Failed to update Coin Value. ❌';
        setTimeout(() => this.updateCoinModal.hide(), 1500);
      }
    );
  }
}
