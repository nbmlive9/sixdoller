import { Component, AfterViewInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
declare var bootstrap: any;

@Component({
  selector: 'app-reward-users-data',
  templateUrl: './reward-users-data.component.html',
  styleUrls: ['./reward-users-data.component.scss']
})
export class RewardUsersDataComponent implements AfterViewInit {

 rdata: any[] = [];

sponsorModal: any;
sponsorList: any[] = [];
selectedSponsor: any = null;
sponsorWalletRows: any[] = [];

selectedUser: any = null;
walletRows: any[] = [];
walletModal: any;

directModal: any;
directUser: any = null;
directRows: any[] = [];

sponsorWalletModal: any;

  constructor(
    private api: AuthUserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetRewardData();
  }

  // Get API Data
  GetRewardData() {
    this.api.GetRewardCount().subscribe((res: any) => {
      console.log('reward', res);
      this.rdata = res.data;
    });
  }

// UserWiseDirectData(id: any) {

//   this.api.UserWiseDirectCount(id).subscribe((res: any) => {
//     console.log('usercount', res);

//     this.directUser = res.data;  // contains name, regid, sponsorees
//     this.directRows = [];

//     const sponsorees = res.data.sponsorees || [];

//     if (sponsorees.length > 0) {

//       sponsorees.forEach((item: any) => {
//         const jf = item.joinwallet_frequency || {};

//         Object.keys(jf).forEach(addr => {
//           this.directRows.push({
//             regid: res.data.regid,
//             name: res.data.name,
//             wallet: addr,
//             count: jf[addr]
//           });
//         });

//       });
//     }

//     this.directModal.show();
//   });
// }

UserWiseDirectData(id: any) {

  this.api.UserWiseDirectCount(id).subscribe((res: any) => {
    console.log('usercount', res);

    // store user info
    this.directUser = res.data;

    // load sponsor list
    this.sponsorList = res.data.sponsorees || [];

    this.sponsorModal.show();
  });
}

OpenSponsorWallet(item: any) {
  console.log("Sponsor clicked:", item);

  this.selectedSponsor = item;
  this.sponsorWalletRows = [];

  const jf = item.joinwallet_frequency || {};

  Object.keys(jf).forEach(addr => {
    this.sponsorWalletRows.push({
      address: addr,
      count: jf[addr]
    });
  });

  this.sponsorWalletModal.show(); // FIXED
}




  ngAfterViewInit() {
    const walletModalEl = document.getElementById('walletModal');
    if (walletModalEl) {
      this.walletModal = new bootstrap.Modal(walletModalEl);
    }
    const directModalEl = document.getElementById('directModal');
if (directModalEl) {
  this.directModal = new bootstrap.Modal(directModalEl);
}
const sponsorModalEl = document.getElementById('sponsorModal');
if (sponsorModalEl) {
  this.sponsorModal = new bootstrap.Modal(sponsorModalEl);
}

const sponsorWalletModalEl = document.getElementById('sponsorWalletModal');
if (sponsorWalletModalEl) {
  this.sponsorWalletModal = new bootstrap.Modal(sponsorWalletModalEl);
}



  }

  // Open Modal for Joint Wallet Frequency
  openWalletModal(user: any) {
    this.selectedUser = user;

    const joinData = user.joinwallet_frequency;

    // Convert object → array
    this.walletRows = Object.keys(joinData).map(key => ({
      regid: user.regid, 
      address: key,
      count: joinData[key]
    }));

    this.walletModal.show();
  }

  downloadDirectExcel() {
  if (!this.directRows.length) {
    alert("No direct data available.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(
    this.directRows.map((row: any, i: number) => ({
      "S.No": i + 1,
      "Reg ID": row.regid,
      "Name": row.name,
      "Wallet Address": row.wallet,
      "Count": row.count
    }))
  );

  const workbook = { Sheets: { "Direct Users" : worksheet }, SheetNames: ["Direct Users"] };
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAs(new Blob([excelBuffer]), `DirectUsers_${this.directUser.regid}.xlsx`);
}


  // Download Excel for Reward Users
  downloadRewardExcel() {
    if (!this.rdata || this.rdata.length === 0) {
      alert('No reward data available to download.');
      return;
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.rdata.map((user: any, index: number) => ({
        'S.No': index + 1,
        'Reg ID': user.regid,
        'Name': user.name,
        'Sponsor Count': user.sponcer_count,
        'Team Count': user.team_count
      }))
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Reward Users': worksheet },
      SheetNames: ['Reward Users']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = `Reward_Users_${new Date().toISOString().split('T')[0]}.xlsx`;

    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }


    // Download Joint Wallet Data (Modal)
  downloadWalletExcel() {
    if (!this.walletRows.length) {
      alert('No wallet data available.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      this.walletRows.map((row: any, i: number) => ({
        "S.No": i + 1,
        "Reg ID": row.regid,   // ADDED
        "Wallet Address": row.address,
        "Count": row.count
      }))
    );

    const workbook = { Sheets: { 'Joint Wallet': worksheet }, SheetNames: ['Joint Wallet'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const fileName = `Wallet_Data_${this.selectedUser.regid}.xlsx`;

    saveAs(new Blob([excelBuffer]), fileName);
  }



}
