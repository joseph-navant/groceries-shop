import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Cart } from './core/models/cart';
import { Grocery } from './core/models/grocery';
import { CartHelper } from './core/services/helper/cart-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  cart: Cart;

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly menu: MenuController
  ) {}

  ngOnInit() {
    this.initCart();
  }

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }

  onHideCart() {
    this.menu.close();
  }

  private initCart() {
    this.cartHelper.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
    });
  }
}
