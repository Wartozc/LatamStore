import { Component, OnInit } from '@angular/core';

import { MercadoService } from '../../services/mercado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss'],
})
export class InteractiveComponent implements OnInit {
  constructor(public api: MercadoService, private router: Router) {}

  ngOnInit(): void {}

  verShoppingCar() {
    this.router.navigate(['shoppingcar']);
  }
}
