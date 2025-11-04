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
      constructor(private api: AuthUserService){}
    
      ngOnInit(){
        this.loadTransferTransactions();
      }
    
       loadTransferTransactions() {
        this.api.WalletLevelAndReferralReport().subscribe((res: any) => {
          console.log('lrdata',res);
          this.data1 = res.data;
        });
      }
}
