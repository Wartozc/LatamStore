import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CartItem, Item, Result } from '../interfaces/item';

const CART_KEY = 'shopping_cart';

@Injectable({
  providedIn: 'root',
})
export class MercadoService {
  private _productsCart: CartItem[] = [];
  total!: number;

  get productsCart(): CartItem[] {
    return [...this._productsCart];
  }

  constructor(private http: HttpClient) {
    this._productsCart = this.getCart();
    this.calcularTotal();
  }

  addToCart(product: Result) {
    const productIndex = this._productsCart.findIndex(
      (cartItem) => cartItem.id === product.id
    );

    if (productIndex < 0) {
      this._productsCart = [...this._productsCart, { ...product, quantity: 1 }];
    } else {
      const cartCopy = this.productsCart;

      const actualProduct = cartCopy[productIndex];

      cartCopy[productIndex] = {
        ...actualProduct,
        quantity: actualProduct.quantity + 1,
      };

      this._productsCart = cartCopy;
    }

    this.saveCart();
    this.calcularTotal();
  }

  disToCart(product: CartItem) {
    this._productsCart = this.productsCart.filter((producto) => {
      return producto.id != product.id;
    });
    this.saveCart();
    this.calcularTotal();
  }

  private saveCart() {
    const jsonCart = JSON.stringify(this._productsCart);

    localStorage.setItem(CART_KEY, jsonCart);
  }

  private getCart(): CartItem[] {
    const jsonCart = localStorage.getItem(CART_KEY);

    if (!jsonCart) {
      return [];
    }

    try {
      return JSON.parse(jsonCart);
    } catch {
      return [];
    }
  }

  calcularTotal() {
    this.total = 0;
    this.productsCart.map(({ price, quantity }) => {
      this.total = this.total + price * quantity;
      return this.total;
    });
  }

  private withPagination(
    params: HttpParams,
    page: number = 1,
    limit: number = 20
  ) {
    if (page <= 0) {
      page = 1;
    }

    if (limit <= 0) {
      limit = 20;
    }

    const offset = (page - 1) * limit;

    return params.set('offset', offset).set('limit', limit);
  }

  getByProductsCategory(category: string, page?: number, limit?: number) {
    let params = new HttpParams().set('category', category);

    params = this.withPagination(params, page, limit);

    return this.http.get<Item>(
      'https://api.mercadolibre.com/sites/MCO/search',
      { params }
    );
  }

  searchProducts(keyword: string, page?: number, limit?: number) {
    let params = new HttpParams().set('q', keyword);

    params = this.withPagination(params, page, limit);

    return this.http.get<Item>(
      'https://api.mercadolibre.com/sites/MCO/search',
      { params }
    );
  }
}
