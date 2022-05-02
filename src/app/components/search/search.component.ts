import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  interval,
  Observable,
  TimeInterval,
  tap,
  Subject,
  filter,
  takeUntil,
  take,
} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  keyword: String = '';
  emptyWord: boolean = false;
  viewtime: Observable<number> = interval(1000);

  constructor(public router: Router) {}

  onSend() {
    if (this.keyword) {
      this.router.navigate(['search', this.keyword]);
      this.emptyWord = false;
    } else {
      this.emptyWord = true;
      this.viewtime.pipe(take(7)).subscribe((value) => {
        if (value === 6) {
          this.emptyWord = false;
        }
      });
    }
  }
}
