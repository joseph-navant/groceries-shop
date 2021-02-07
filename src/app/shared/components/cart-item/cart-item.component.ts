import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grocery } from 'src/app/core/models/grocery';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input()
  grocery: Grocery;
  @Output()
  add = new EventEmitter();
  @Output()
  remove = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onAdd(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.add.emit();
  }

  onRemove(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.remove.emit();
  }
}
