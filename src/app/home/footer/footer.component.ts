import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public router: Router) {}
  
  // Helper method to check if current route is login or signup
  hideBottomNav(): boolean {
    return this.router.url === '/login' || this.router.url === '/sign';
  }

}
