import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListPageRoutingModule } from './product-list-routing.module';
import { ProductListPage } from './product-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    SharedModule,
  ],
  declarations: [ProductListPage],
})
export class ProductListPageModule {}
