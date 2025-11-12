import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent {
  data1: any;
  isLoading = true; // Loading state

  constructor(private api: AuthUserService) {}

  ngOnInit() {
    this.getreferrals();
  }

  getreferrals() {
    this.isLoading = true; // Start loading before API call
    this.api.Referrals().subscribe({
      next: (res: any) => {
        // console.log(res);
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