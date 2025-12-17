import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-activation-report',
  templateUrl: './activation-report.component.html',
  styleUrls: ['./activation-report.component.scss']
})
export class ActivationReportComponent {

   data1: any;
    isLoading = true; // Loading state
  
    constructor(private api: AuthUserService) {}
  
    ngOnInit() {
      this.getreferrals();
    }
  
    getreferrals() {
      this.isLoading = true; // Start loading before API call
      this.api.ActivationData().subscribe({
        next: (res: any) => {
          console.log('adata',res);
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
