import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUserService } from './auth-user.service';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private totalMembersSubject = new BehaviorSubject<number>(0);
  private levelCountsSubject = new BehaviorSubject<{ level: number; count: number }[]>([]);
  
  totalMembers$ = this.totalMembersSubject.asObservable();
  levelCounts$ = this.levelCountsSubject.asObservable();

  private dataLoaded: boolean = false;

  constructor(private api: AuthUserService) {}

  loadLevelData() {
    // Only fetch once
    if (this.dataLoaded) return;

    this.api.LevelMembersReport().subscribe((res: any) => {
      if (!res?.data) return;

      const rawData = Array.isArray(res.data) ? res.data[0] : res.data;

      let totalMembers = 0;
      let levelCounts: { level: number; count: number }[] = [];

      for (let i = 1; i <= 12; i++) {
        const levelKey = `level${i}`;
        const membersArray = Array.isArray(rawData[levelKey]) ? rawData[levelKey] : [];
        const count = membersArray.length;
        totalMembers += count;

        if (i <= 4) levelCounts.push({ level: i, count });
      }

      this.totalMembersSubject.next(totalMembers);
      this.levelCountsSubject.next(levelCounts);

      this.dataLoaded = true; // mark loaded
    });
  }
}
