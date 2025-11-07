import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-referral-income',
  templateUrl: './referral-income.component.html',
  styleUrls: ['./referral-income.component.scss']
})
export class ReferralIncomeComponent {

      data1: any;
    data='welcome';
    loading: boolean = true;
      constructor(private api: AuthUserService){}
    
      ngOnInit(){
        this.loadTransferTransactions();
      }
    
     loadTransferTransactions() {
    this.loading = true; // start loading
    this.api.WalletLevelAndReferralReport().subscribe(
      (res: any) => {
        this.data1 = res.data;
        this.loading = false; // end loading
      },
      err => {
        console.error(err);
        this.loading = false; // end loading even if error
      }
    );
  }
  
}
