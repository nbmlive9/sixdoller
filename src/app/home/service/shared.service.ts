import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private totalMembersSubject = new BehaviorSubject<number>(0);
  private levelCountsSubject = new BehaviorSubject<{ level: number; count: number }[]>([]);

  totalMembers$ = this.totalMembersSubject.asObservable();
  levelCounts$ = this.levelCountsSubject.asObservable();

  setTotalMembers(value: number) {
    this.totalMembersSubject.next(value);
  }

  setLevelCounts(value: { level: number; count: number }[]) {
    this.levelCountsSubject.next(value);
  }
}
