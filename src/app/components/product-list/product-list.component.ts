import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  products: Result[] = [];

  @Input()
  loading: boolean = true;

  visible: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (this.products.length >= 0) {
      this.visible = true;
    }
  }
}
