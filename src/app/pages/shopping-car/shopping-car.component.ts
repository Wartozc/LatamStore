import { Component, OnInit } from '@angular/core';
import { MercadoService } from '../../services/mercado.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.scss'],
})
export class ShoppingCarComponent {
  constructor(public mercadoService: MercadoService) {}
}
