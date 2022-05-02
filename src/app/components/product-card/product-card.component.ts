import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/item';
import { MercadoService } from 'src/app/services/mercado.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('item')
  product!: Result;
  discount: number = 0;

  constructor(public api: MercadoService) {}

  ngOnInit(): void {
    const { original_price: originalPrice, price } = this.product;

    if (!originalPrice) {
      this.discount = 0;
      return;
    }

    this.discount = Math.floor(
      ((originalPrice! - price) / originalPrice!) * 100
    );
  }

  addProducts() {
    this.api.addToCart(this.product);
  }
}
