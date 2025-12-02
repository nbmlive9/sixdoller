import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
import { SharedService } from '../service/shared.service';

interface LevelMember {
  regid: string;
  name: string;
  boardStatus?: string;
}

@Component({
  selector: 'app-level-income',
  templateUrl: './level-income.component.html',
  styleUrls: ['./level-income.component.scss']
})
export class LevelIncomeComponent implements OnInit {
  rawData: any;
  levelMembers: { level: number; members: LevelMember[] }[] = [];
  selectedLevel: number = 1;
  rankBoard: string = 'N/A'; // ✅ define rankBoard
 totalMembers: number = 0;
  levelCounts: { level: number; count: number }[] = [];
  loadingData: boolean = true;
  constructor(private api: AuthUserService, private sharedService:SharedService) {}

  ngOnInit() {
    this.loadLevelData();
     this.sharedService.loadLevelData();
  }

  

  loadLevelData() {
  this.loadingData = true;  // ⭐ start loading

  this.api.LevelMembersReport().subscribe({
    next: (res: any) => {
      if (!res?.data) {
        this.loadingData = false;
        return;
      }

      this.rawData = Array.isArray(res.data) ? res.data[0] : res.data;

      this.levelMembers = [];
      this.totalMembers = 0;
      this.levelCounts = [];

      for (let i = 1; i <= 12; i++) {
        const levelKey = `level${i}`;
        const levelData = this.rawData[levelKey];

      let members: LevelMember[] = [];
        let count = 0;

        if (Array.isArray(levelData)) {
          members = levelData.map((m: any) => ({
            regid: m.regid,
            name: m.name,
            boardStatus: this.getBoardStatus(m)
          }));

          count = members.length;
        }

        this.levelMembers.push({ level: i, members });
        this.levelCounts.push({ level: i, count });
        this.totalMembers += count;
      }

      this.updateRankBoard();
      this.loadingData = false;  // ⭐ stop loading
    },

    error: (err) => {
      console.error(err);
      this.loadingData = false; // stop loading even if error
    }
  });
}

  

 getBoardStatus(member: any): string {
  let lastBoard = 0;
  // Loop all boards from 1 to 15
  for (let i = 1; i <= 15; i++) {
    if (member[`board${i}`] === '1') {
      lastBoard = i; // keep updating to the last board with '1'
    }
  }
  return lastBoard ? `Board ${lastBoard}` : 'Running';
}


  selectLevel(level: number) {
    this.selectedLevel = level;
    this.updateRankBoard();
  }

  updateRankBoard() {
    const level = this.levelMembers[this.selectedLevel - 1];
    if (!level || !level.members.length) {
      this.rankBoard = 'N/A';
      return;
    }

    // Take first member's boardStatus as rankBoard
    this.rankBoard = level.members[0]?.boardStatus || 'N/A';
  }
}
