import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-gbonus-income',
  templateUrl: './gbonus-income.component.html',
  styleUrls: ['./gbonus-income.component.scss']
})
export class GbonusIncomeComponent {

  hdata:any;
   isLoading = true;
    constructor(private api:AuthUserService){}
  
    ngOnInit(){
      this.getgbonusreport();
    }
  
    getgbonusreport() {
    this.isLoading = true; // Start loading before API call
    this.api.GbonusWalletReport().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.hdata = res.data;
        this.isLoading = false; // Stop loading once data is received
      },
      error: (err) => {
        console.error('Error fetching G-Bonus data', err);
        this.isLoading = false;
      }
    });
  }

}
