import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  menuOpen = false;

  constructor(public router: Router, private token: TokenStorageService, private sharedService:SharedService) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // signOut() {
  //   this.token.signOut();
  // }

  signOut() {
  this.sharedService.resetLevelData();
  this.token.signOut();
}


}
