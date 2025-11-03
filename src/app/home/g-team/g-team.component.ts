import { Component } from '@angular/core';
import { AuthUserService } from '../service/auth-user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-g-team',
  templateUrl: './g-team.component.html',
  styleUrls: ['./g-team.component.scss']
})
export class GTeamComponent {
 team: any = {};
  selectedLevelMembers: any[] = [];
  isLoading = true; // Loader state

  constructor(private api: AuthUserService) {}

  ngOnInit() {
    this.getTeamData();
  }

  // Fetch team data
  getTeamData() {
    this.isLoading = true; // Show loader

    this.api.levelMember().subscribe({
      next: (res: any) => {
        // console.log('team', res);

        const data = res.data;

        // Normalize response to ensure arrays
        this.team.level1 = Array.isArray(data.level1) ? data.level1 : [];
        this.team.level2 = Array.isArray(data.level2) ? data.level2 : [];
        this.team.level3 = Array.isArray(data.level3) ? data.level3 : [];
        this.team.level4 = Array.isArray(data.level4) ? data.level4 : [];
        this.team.level5 = Array.isArray(data.level5) ? data.level5 : [];

        this.isLoading = false; // Hide loader
      },
      error: (err) => {
        console.error('Error fetching team data:', err);
        this.isLoading = false; // Hide loader on error
      }
    });
  }

  // Open modal with level members
  openLevelModal(levelMembers: any[]) {
    this.selectedLevelMembers = levelMembers || [];
    const modalElement = document.getElementById('levelModal');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }
}
