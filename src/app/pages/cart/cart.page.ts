import { Component, OnInit } from '@angular/core';
import { Grocery } from 'src/app/core/models/grocery';
import { CartHelper } from 'src/app/core/services/helper/cart-helper.service';
import { RouterHelper } from 'src/app/core/services/helper/router-helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartGroceries: Grocery[];

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly routerHelper: RouterHelper
  ) {}

  ngOnInit() {
    const state = this.routerHelper.getState();
    this.cartGroceries = (state && state.cartGroceries) || [];
  }

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }
}
