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
      this.checkScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreen();
  }

    checkScreen() {
    this.isDesktop = window.innerWidth >= 992; // bootstrap lg breakpoint
    if (this.isDesktop) {
      this.menuOpen = false; // mobile menu hidden on desktop
    }
  }

  toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

   closeMenuDesktop() {
    if (!this.isDesktop) this.menuOpen = false;
  }
  
      signOut() {
    this.token.signOut();
  }


}
