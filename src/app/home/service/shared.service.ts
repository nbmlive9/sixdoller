import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 totalMembers: number = 0;
  levelCounts: { level: number; count: number }[] = [];
  constructor() { }
}
