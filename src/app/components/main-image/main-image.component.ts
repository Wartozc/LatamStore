import { Component, HostListener, OnInit } from '@angular/core';

const MOBILE_IMAGE = '../../../assets/images/banner-principal-mobile.png';
const DESKTOP_IMAGE = '../../../assets/images/banner-principal-desktop.png';

@Component({
  selector: 'app-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.scss'],
})
export class MainImageComponent implements OnInit {
  imageToShow: string = DESKTOP_IMAGE;

  constructor() {
    this.onResize();
  }

  ngOnInit(): void {}

  @HostListener('window:resize')
  onResize() {
    const width = window.innerWidth;

    if (width <= 600) {
      this.imageToShow = MOBILE_IMAGE;
    } else {
      this.imageToShow = DESKTOP_IMAGE;
    }
  }
}
