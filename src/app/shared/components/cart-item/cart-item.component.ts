import { Component, Input, OnInit } from '@angular/core';
import { Grocery } from 'src/app/core/models/grocery';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() grocery: Grocery;

  constructor() {}

  ngOnInit() {}
}
