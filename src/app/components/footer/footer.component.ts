import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  politic: boolean = true;
  about: boolean = true;
  social: boolean = true;

  changePolitic() {
    this.politic = !this.politic;
  }
  changeAbout() {
    this.about = !this.about;
  }
  changeSocial() {
    this.social = !this.social;
  }
}
