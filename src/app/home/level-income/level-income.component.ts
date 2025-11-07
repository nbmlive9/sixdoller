import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';

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

  constructor(private api: AuthUserService) {}

  ngOnInit() {
    this.loadLevelData();
  }

  loadLevelData() {
    this.api.LevelMembersReport().subscribe((res: any) => {
      console.log('levelmem',res);
      if (!res?.data) return;

      this.rawData = Array.isArray(res.data) ? res.data[0] : res.data;
      if (!this.rawData) return;

      this.levelMembers = [];

      for (let i = 1; i <= 12; i++) {
        const levelKey = `level${i}`;
        const levelData = this.rawData[levelKey];

        let members: LevelMember[] = [];
        if (Array.isArray(levelData)) {
          members = levelData.map((m: any) => ({
            regid: m.regid,
            name: m.name,
            boardStatus: this.getBoardStatus(m)
          }));
        }

        this.levelMembers.push({ level: i, members });
      }

      // ✅ Set initial rankBoard based on first member in first level
      this.updateRankBoard();
    }, err => {
      console.error('Error fetching level data', err);
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
