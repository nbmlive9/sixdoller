import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
declare var bootstrap: any;
@Component({
  selector: 'app-cp-all-users',
  templateUrl: './cp-all-users.component.html',
  styleUrls: ['./cp-all-users.component.scss']
})
export class CpAllUsersComponent {
  data1: any;
profileform:FormGroup;
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  pageGroupSize = 10;
  currentGroupStart = 1;
    tuser: any;
  pffdata: any;
  isEdit = false;
  userid: any;
  rdata:any;
  constructor(private api:AuthUserService, private fb:FormBuilder, private router:Router){
        this.profileform = this.fb.group({
      password: [''],
      name: [''],
      email: [''],
      wallet1: ['']
    });
  }

   ngOnInit() {
    this.Totalusers();
    this.totaluseradatanopage();
  }

  // ngAfterViewInit() {
  //   const modalEl = document.getElementById('updateCoinModal');
  //   if (modalEl) {
  //     this.updateCoinModal = new bootstrap.Modal(modalEl);
  //   }
  // }

  totaluseradatanopage(){
    this.api.TotalUsersNoPage().subscribe((res:any)=>{
      console.log('usersdata',res);
      this.rdata=res.data;
      
    })
  }

   Totalusers(page: number = 1) {
    this.currentPage = page;
    this.api.totalusers(page).subscribe({
      next: (res: any) => {
        console.log('totacountuser',res);
        this.tuser = {
          count: res.data.count,
          data: res.data.data,
          nextpage: res.data.nextpage,
          previouspage: res.data.previouspage,
        };
        this.updateTotalPages(res.data.count);
      },
      error: (err) => console.error('Total Users API error:', err),
    });
  }

  updateTotalPages(count: number) {
    this.totalPages = Math.ceil(count / this.pageSize);
    this.updatePageGroup();
  }

  updatePageGroup() {
    this.currentGroupStart = Math.floor((this.currentPage - 1) / this.pageGroupSize) * this.pageGroupSize + 1;
  }

  get pageArray(): number[] {
    const pages = [];
    const maxPage = Math.min(this.currentGroupStart + this.pageGroupSize - 1, this.totalPages);
    for (let i = this.currentGroupStart; i <= maxPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  gotoPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePageGroup();
    this.Totalusers(page);
  }

  prevGroup() {
    const prevGroupStart = this.currentGroupStart - this.pageGroupSize;
    if (prevGroupStart >= 1) {
      this.gotoPage(prevGroupStart);
    }
  }

  nextGroup() {
    const nextGroupStart = this.currentGroupStart + this.pageGroupSize;
    if (nextGroupStart <= this.totalPages) {
      this.gotoPage(nextGroupStart);
    }
  }

  openProfile(item: any) {
    this.userid = item.regid;
    this.isEdit = false;
    this.pffdata = item;
    this.profileform.patchValue(item);
    this.profileform.markAsPristine();
  }

  edit() {
    this.isEdit = true;
  }

  save() {
    const payload = this.profileform.value;
    const id = this.userid;
    this.api.cupdateprofile(id, payload).subscribe({
      next: (res: any) => {
        if (res.status === 1) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/allusers']);
          });
          this.pffdata = { ...this.pffdata, ...payload };
          this.isEdit = false;
        }
      },
      error: (err) => console.error("updateprofile error:", err)
    });
  }

  downloadRewardExcel() {
    if (!this.rdata || this.rdata.length === 0) {
      alert('No reward data available to download.');
      return;
    }
  
    // Convert reward data to worksheet
   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.rdata.map((user: any, index: number) => ({
        'S.No': index + 1,
        'Date': user.adate,
         'Time': user.atime,
        'Reg ID': user.regid,
         'Password': user.password,
        'Name': user.name,
        'email': user.email,
        'Sponsor ID': user.sponcerid,
            'Secure Pin': user.rpin,
           'Activation Wallet': user.actwallet,
           'Wallet Fund': user.walletamount,
           'Wallet Address': user.wallet1,
          'Re-Birth Count': user.autocount,

      }))
    );
  
    // Create a workbook and append the sheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Reward Users': worksheet },
      SheetNames: ['Reward Users']
    };
  
    // Generate Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Save file
    const fileName = `Reward_Users_${new Date().toISOString().split('T')[0]}.xlsx`;
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }


}
