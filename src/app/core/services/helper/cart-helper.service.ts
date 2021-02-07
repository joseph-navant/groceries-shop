import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Grocery } from '../../models/grocery';

@Injectable({
  providedIn: 'root',
})
export class CartHelper {
  private groceries: Grocery[] = [];
  private cart: BehaviorSubject<Grocery[]> = new BehaviorSubject(
    this.groceries
  );
  cart$ = this.cart.asObservable();

  constructor() {}

  add(grocery: Grocery) {
    const cartGrocery = this.groceries.find((g) => g.id === grocery.id);
    if (cartGrocery) {
      cartGrocery.unitsInCart = cartGrocery.unitsInCart + 1;
    } else {
      this.groceries.push({ ...grocery, unitsInCart: 1 });
    }

    this.cart.next(this.groceries);
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

    this.cart.next(this.groceries);
  }
}
