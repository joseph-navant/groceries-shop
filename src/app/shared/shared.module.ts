import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartItemComponent } from './components/cart-item/cart-item.component';

const DECLARATIONS = [
  // components
  CartItemComponent,

  // directives

  // pipes
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [CommonModule, IonicModule],
  exports: [...DECLARATIONS],
})
export class SharedModule {}
