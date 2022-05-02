import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/item';
import { MercadoService } from 'src/app/services/mercado.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  title = 'LatamStore';
  width: number = 0;

  isLoading: boolean = true;
  popularProducts: Result[] = [];
  popularProductsQuantity: number = 10;

  constructor(public api: MercadoService) {}

  ngOnInit(): void {
    this.getPopularProducts();
  }

  getPopularProducts() {
    const mostSearchedProductsCategoryId = 'MCO1430';

    this.isLoading = true;

    this.api
      .getByProductsCategory(
        mostSearchedProductsCategoryId,
        1,
        this.popularProductsQuantity
      )
      .subscribe((response) => {
        this.popularProducts = response.results;
        this.isLoading = false;
      });
  }
}
