import { ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header.component';
import { TitleComponent } from '../../components/title/title.component';
import { SearchComponent } from '../../components/search/search.component';
import { InteractiveComponent } from '../../components/interactive/interactive.component';
import { SesionComponent } from '../../components/sesion/sesion.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { MainImageComponent } from '../../components/main-image/main-image.component';
import { MenuMobileComponent } from '../../components/menu-mobile/menu-mobile.component';
import { ImagesComponent } from '../../components/images/images.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { NgxGlideModule } from 'ngx-glide';

@NgModule({
  declarations: [
    HeaderComponent,
    TitleComponent,
    SearchComponent,
    InteractiveComponent,
    SesionComponent,
    MenuComponent,
    MainImageComponent,
    MenuMobileComponent,
    ImagesComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    LoadingComponent,
    SliderComponent,
  ],
  imports: [CommonModule, FormsModule, NgxGlideModule],
  exports: [
    HeaderComponent,
    TitleComponent,
    SearchComponent,
    InteractiveComponent,
    SesionComponent,
    MenuComponent,
    MainImageComponent,
    MenuMobileComponent,
    ImagesComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    LoadingComponent,
    SliderComponent,
  ],
})
export class SharedModule {}
