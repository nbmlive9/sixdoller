import { Component, AfterViewInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
rdata: any;
  rewardUsersModal: any;
  constructor(private api: AuthUserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      coinvalue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.yohanprice();
    this.cpDashboardData();
     this.GetRewardData();
  }

  GetRewardData() {
    this.api.GetRewardCount().subscribe((res: any) => {
      console.log('reward',res);
      this.rdata = res.data;
    });
  }

    openRewardModal() {
    this.rewardUsersModal.show();
  }

 


  ngAfterViewInit() {
    const modalEl = document.getElementById('updateCoinModal');
    if (modalEl) {
      this.updateCoinModal = new bootstrap.Modal(modalEl);
    }
     const rewardModalEl = document.getElementById('rewardUsersModal');
    if (rewardModalEl) {
      this.rewardUsersModal = new bootstrap.Modal(rewardModalEl);
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
