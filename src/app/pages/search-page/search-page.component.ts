import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Result } from 'src/app/interfaces/item';
import { MercadoService } from 'src/app/services/mercado.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  private searchKeyword: string = '';

  page: number = 1;
  hasMoreProducts: boolean = false;
  products: Result[] = [];
  isLoading: boolean = true;
  title: string = '';

  constructor(
    public route: ActivatedRoute,
    public mercadoApi: MercadoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.products = [];
          this.isLoading = true;
          this.page = +params['page'] || 1;
          this.searchKeyword = params['keyword'];
        }),
        switchMap((params) =>
          this.mercadoApi.searchProducts(params['keyword'], params['page'])
        ),
        tap((result) => {
          this.hasMoreProducts = result.paging.total > this.page * 20;
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.products = response.results;

        if (response.results.length == 0) {
          this.title = 'No se encontraron resultados';
        } else {
          this.title = 'Resultados de búsqueda';
        }
      });
  }

  changePage(pageNumber: number) {
    this.router.navigate(['search', this.searchKeyword, 'page', pageNumber]);
  }

  previousPage() {
    this.changePage(this.page - 1);
  }

  nextPage() {
    this.changePage(this.page + 1);
  }
}
