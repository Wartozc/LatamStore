import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ShoppingCarComponent } from './pages/shopping-car/shopping-car.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'search/:keyword', component: SearchPageComponent },
  { path: 'search/:keyword/page/:page', component: SearchPageComponent },
  { path: 'shoppingcar', component: ShoppingCarComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
