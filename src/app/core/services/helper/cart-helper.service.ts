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
    this.groceries.push(grocery);
    this.cart.next(this.groceries);
  }
}
