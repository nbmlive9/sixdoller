import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-royalty-income',
  templateUrl: './royalty-income.component.html',
  styleUrls: ['./royalty-income.component.scss']
})
export class RoyaltyIncomeComponent {

   data1: any;
    isLoading = true; // Loading state
  
    constructor(private api: AuthUserService) {}
  
    ngOnInit() {
      this.getroyaltyincome();
    }
  
    getroyaltyincome() {
      this.isLoading = true; // Start loading before API call
      this.api.RoyaltyIncome().subscribe({
        next: (res: any) => {
          console.log(res);
          this.data1 = res.data;
          this.isLoading = false; // Stop loading once data is received
        },
        error: (err) => {
          console.error('Error fetching referrals', err);
          this.isLoading = false; // Stop loading even if error
        }
      });
    }

}
