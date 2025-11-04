import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
menuOpen = false;
 isDesktop = false;


  constructor(public router: Router, private token:TokenStorageService) {}

  ngOnInit(){
     this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 992; // Bootstrap LG breakpoint
    if (this.isDesktop) {
      this.menuOpen = false; // always auto-open on desktop
    }
  }

  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

    closeMenuDesktop() {
    if (!this.isDesktop) {
      this.menuOpen = false;
    }
  }
  
      signOut() {
    this.token.signOut();
  }


}
