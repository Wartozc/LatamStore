import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss'],
})
export class MenuMobileComponent {
  showMenu = false;

  constructor(private router: Router) {}

  goTo(page: string) {
    this.router.navigate([`/search/${page}`]);
    this.showMenu = !this.showMenu;
  }

  toggle() {
    this.showMenu = !this.showMenu;
  }
}
