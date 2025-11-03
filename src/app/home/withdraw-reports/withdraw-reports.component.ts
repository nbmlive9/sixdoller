import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-withdraw-reports',
  templateUrl: './withdraw-reports.component.html',
  styleUrls: ['./withdraw-reports.component.scss']
})
export class WithdrawReportsComponent {

   data1: any[] = [];
  loading = true; // <-- loading state
  errorMessage = '';

  constructor(private api: AuthUserService) {}

  ngOnInit() {
    this.CompletedReportdata();
  }

  CompletedReportdata() {
    this.loading = true;
    this.api.CompletedWithdraw().subscribe({
      next: (res: any) => {
        console.log('completed', res);
        this.data1 = res?.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Failed to fetch withdraw report. Please try again later.';
      }
    });
  }
  
   

}
