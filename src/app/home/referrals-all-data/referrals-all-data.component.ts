import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-referrals-all-data',
  templateUrl: './referrals-all-data.component.html',
  styleUrls: ['./referrals-all-data.component.scss']
})
export class ReferralsAllDataComponent {

   wdata: any;
  totalRecords: number = 0;
  page: number = 1;
  perPage: number = 20;
  loading: boolean = false;
  allLoaded: boolean = false;
  pro: any[] = [];
startDate: string = ''; // bound to input
endDate: string = '';
allData: any[] = [];
  constructor(private location: Location, private api: AuthUserService) {}

  ngOnInit() {
    this.loadMore(); // Load first page
  }

  Back() {
    this.location.back();
  }

   onScroll(event: any): void {
  const target = event.target;

  // calculate distance from bottom
  const threshold = 20; // pixels from bottom to trigger
  const position = target.scrollHeight - target.scrollTop - target.clientHeight;

  if (position <= threshold && !this.loading && !this.allLoaded) {
    this.loadMore();
  }
}

loadMore(): void {
  if (this.loading || this.allLoaded) return;

  this.loading = true;

  this.api.ReferralsAllData(this.page, this.perPage).subscribe({
    next: (res: any) => {
      // console.log(res);
      
      const newData = res.data?.data || [];

      if (newData.length > 0) {
        this.allData = [...this.allData, ...newData];
        this.applyDateFilter();
        this.page++;
      } else {
        // No data returned
        this.allLoaded = true;
      }

      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading transactions', err);

      // Treat 404 as no more data
      if (err.status === 404) {
        this.allLoaded = true;
      }

      this.loading = false;
    }
  });
}

applyDateFilter(): void {
  if (!this.startDate && !this.endDate) {
    this.pro = [...this.allData]; // no filter, show all
    return;
  }

  const start = this.startDate ? new Date(this.startDate) : null;
  const end = this.endDate ? new Date(this.endDate) : null;

  this.pro = this.allData.filter((wd:any) => {
    const cdate = new Date(wd.cdate);
    if (start && end) {
      return cdate >= start && cdate <= end;
    } else if (start) {
      return cdate >= start;
    } else if (end) {
      return cdate <= end;
    }
    return true;
  });
};

}
