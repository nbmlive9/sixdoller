import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthUserService } from '../service/auth-user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  page: number = 1;
  perPage: number = 20;

  loading = false;
  allLoaded = false;

  allData: any[] = [];
  pro: any[] = [];

  startDate: string = '';
  endDate: string = '';

  constructor(private location: Location, private api: AuthUserService) {}

  ngOnInit() {
    this.loadMore();
  }

  Back() {
    this.location.back();
  }

  onScroll(event: any): void {
    const target = event.target;
    const threshold = 20;
    const position = target.scrollHeight - target.scrollTop - target.clientHeight;

    if (position <= threshold && !this.loading && !this.allLoaded) {
      this.loadMore();
    }
  }

  loadMore(): void {
    if (this.loading || this.allLoaded) return;

    this.loading = true;

    this.api.WalletReportLoad(this.page, this.perPage).subscribe({
      next: (res: any) => {
        const newData = res.data || [];

        // ✅ No records returned → stop further loading
        if (newData.length === 0) {
          this.allLoaded = true;
          this.loading = false;
          return;
        }

        // ✅ Prevent duplicates
        const unique = newData.filter(
          (item: any) => !this.allData.some(existing => existing.id === item.id)
        );

        this.allData.push(...unique);

        // ✅ Apply date filter
        this.applyDateFilter();

        // ✅ If returned records < perPage → last page reached
        if (newData.length < this.perPage) {
          this.allLoaded = true;
        } else {
          this.page++;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error(err);

        if (err.status === 404) {
          this.allLoaded = true;
        }

        this.loading = false;
      }
    });
  }

  applyDateFilter(): void {
    if (!this.startDate && !this.endDate) {
      this.pro = [...this.allData];
      return;
    }

    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.pro = this.allData.filter((wd: any) => {
      const cdate = new Date(wd.cdate);
      if (start && end) return cdate >= start && cdate <= end;
      if (start) return cdate >= start;
      if (end) return cdate <= end;
      return true;
    });
  }

}
