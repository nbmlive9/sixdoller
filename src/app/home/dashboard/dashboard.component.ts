import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

import { BarcodeFormat } from '@zxing/library';   // 👈 important
import { TokenStorageService } from '../service/token-storage.service';
import { SharedService } from '../service/shared.service';
import { Subscription } from 'rxjs';
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  back: any;
  team:any;
  walletAddress: string = '';
  copied: boolean = false;
totalMembers: number = 0; 
  levelCounts: { level: number; count: number }[] = [];
  private subscriptions: Subscription[] = [];
  // boards = Array.from({ length: 15 }, (_, i) => ({
  //   name: `Board ${i + 1}`,
  //   status: Math.random() > 0.5 ? 'Active' : 'Inactive'
  // }));

  boards = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Board ${i + 1}`,
    // status: i === 1 ? 'Completed' : i === 0 ? 'Completed' : 'Pending'
  }));

  selectedBoard: number = 1; // default board to show

  selectBoard(id: number) {
    this.selectedBoard = id;
  }

  copyAddres() {
    navigator.clipboard.writeText(this.walletAddress).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000); // hide after 2 sec
    });
  }

  pfdata:any;
  hdata:any;
    gbonus: boolean = false;
      withdraw: boolean = false;
  setassets: boolean = true;
  glevel: boolean = false;
  referrals: boolean = false;
    showSection(section: string) {
    this.setassets = section === 'setassets';
    this.glevel = section === 'glevel';
    this.referrals = section === 'referrals';
  }
     showSection1(section: string) {
     this.gbonus = section === 'gbonus';
  }

      showSection2(section: string) {
     this.withdraw = section === 'withdraw';
  }
    openGBonusModal() {
    this.showSection1('gbonus');  // set gbonus true
  }

      openWithdrawModal() {
    this.showSection2('withdraw');  // set gbonus true
  }

  openRoyaltyModal() {
  const modalElement = document.getElementById('royaltyModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}


  wdata:any;
   permissionDenied: boolean = false;
   loadingWallet: boolean = false;

   
  constructor(private api:AuthUserService, private token:TokenStorageService, private sharedService: SharedService){}

  ngOnInit(){
    this.getProfiledata();
    this.getDashboarddata();
    this.gwalletReport();
  
      this.subscriptions.push(
      this.sharedService.totalMembers$.subscribe(val => this.totalMembers = val)
    );
    this.subscriptions.push(
      this.sharedService.levelCounts$.subscribe(val => this.levelCounts = val)
    );

  }

    ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

copiedLink: boolean = false;

copyReferralLink() {
  const referralUrl = `https://yohanrise.com/yohan/referral/${this.pfdata?.regid}`;
  navigator.clipboard.writeText(referralUrl).then(() => {
    this.copiedLink = true;
    setTimeout(() => this.copiedLink = false, 2000);
  });
}

shareTo(platform: string) {
  const regid = this.pfdata?.regid;
  const message = `Welcome to Yohan! 🚀 Join here: https://yohanrise.com/yohan/referral/${regid}`;
  const encodedMessage = encodeURIComponent(message);

  let url = '';
  switch(platform) {
    case 'whatsapp':
      url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      break;
    case 'telegram':
      url = `https://t.me/share/url?url=https://yohanrise.com/yohan/referral/${regid}&text=${encodedMessage}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=https://yohanrise.com/yohan/referral/${regid}`;
      break;
    case 'copy':
      this.copyReferralLink();
      return;
  }

  window.open(url, '_blank');
}


  gwalletReport(){
    this.loadingWallet = true;
  this.api.WalletReport().subscribe({
    next: (res: any) => {
      // console.log('walletreport', res);
      this.wdata = res.data.data;
      this.loadingWallet = false;  // stop loading
    },
    error: (err) => {
      console.error('Error fetching wallet report', err);
      this.loadingWallet = false;  // stop loading even on error
    }
  });
  }

  getProfiledata(){
    this.api.Profile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }


  onRegister() {
    alert('Redirecting to registration page...');
  }

    getDashboarddata(){
    this.api.DashboardData().subscribe((res:any)=>{
      console.log('homedata',res);
      this.hdata=res.data;
    })
  }

 openSharePopup() {
    const modalElement = document.getElementById('shareModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

      showDashboard = false; 
    openDashboard() {
      this.showDashboard = true;
    }



}


