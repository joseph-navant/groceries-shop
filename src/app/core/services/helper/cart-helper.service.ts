import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../models/cart';
import { Grocery } from '../../models/grocery';

@Injectable({
  providedIn: 'root',
})
export class CartHelper {
  private groceries: Grocery[] = [];
  private amount = 0;
  private quantity = 0;
  private cart: BehaviorSubject<Cart> = new BehaviorSubject({
    groceries: this.groceries,
    amount: this.amount,
    quantity: this.quantity,
  });
  cart$ = this.cart.asObservable();

  constructor() {}

  add(grocery: Grocery) {
    const cartGrocery = this.groceries.find((g) => g.id === grocery.id);
    if (cartGrocery) {
      cartGrocery.unitsInCart = cartGrocery.unitsInCart + 1;
    } else {
      this.groceries.push({ ...grocery, unitsInCart: 1 });
    }
    this.amount = this.amount + grocery.price;
    this.quantity = this.quantity + 1;

    const cart = {
      groceries: this.groceries,
      amount: this.amount,
      quantity: this.quantity,
    };
    this.cart.next(cart);
  }

  remove(grocery: Grocery) {
    const cartGroceryIndex = this.groceries.findIndex(
      (g) => g.id === grocery.id
    );
    const cartGrocery = this.groceries[cartGroceryIndex];

    if (cartGrocery.unitsInCart > 1) {
      cartGrocery.unitsInCart = cartGrocery.unitsInCart - 1;
    } else {
      this.groceries.splice(cartGroceryIndex, 1);
    }
    this.amount = this.amount - grocery.price;
    this.quantity = this.quantity - 1;

    const cart = {
      groceries: this.groceries,
      amount: this.amount,
      quantity: this.quantity,
    };
    this.cart.next(cart);
  }
}
