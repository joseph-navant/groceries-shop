import { Grocery } from './grocery';

export interface Cart {
  groceries: Grocery[];
  amount: number;
  quantity: number;
}
