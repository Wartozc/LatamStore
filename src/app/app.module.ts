import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxGlideModule } from 'ngx-glide';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ShoppingCarComponent } from './pages/shopping-car/shopping-car.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SearchPageComponent,
    ShoppingCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxGlideModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
