import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgxGlideComponent } from 'ngx-glide';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @ViewChild('ngxGlide') ngxGlide!: NgxGlideComponent;
  @Input()
  breakPoints: boolean = false;
  breakPoints2: any = '';
  constructor() {}

  ngOnInit(): void {
    if (this.breakPoints) {
      this.breakPoints2 = {
        '700': { perView: 1, bound: true },
        '1080': { perView: 2, bound: true },
        '1400': { perView: 3, bound: true },
        '2048': { perView: 4, bound: true },
      };
    }
  }

  ngAfterViewInit(): void {
    this.ngxGlide.arrowLeftLabel = '<';
  }
}
