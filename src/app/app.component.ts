import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Grocery } from './core/models/grocery';
import { CartHelper } from './core/services/helper/cart-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  cart$ = this.cartHelper.cart$;

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly menu: MenuController
  ) {}

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }

  onHideCart() {
    this.menu.close();
  }
}
