import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/models/cart';
import { Grocery } from 'src/app/core/models/grocery';
import { CartHelper } from 'src/app/core/services/helper/cart-helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Cart;

  constructor(private readonly cartHelper: CartHelper) {}

  ngOnInit() {
    this.initCart();
  }

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }

  private initCart() {
    this.cartHelper.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }
}
