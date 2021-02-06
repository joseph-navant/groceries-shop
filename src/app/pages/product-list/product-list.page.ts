import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Grocery } from 'src/app/core/models/grocery';
import { GroceriesService } from 'src/app/core/services/http/groceries.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  groceries: Grocery[];
  private page = 1;

  constructor(private readonly groceriesService: GroceriesService) {}

  ngOnInit() {
    this.initGroceries();
  }

  loadNextProductsPage() {
    this.loadGroceries(++this.page);
  }

  private initGroceries() {
    this.loadGroceries(this.page);
  }

  private loadGroceries(page: number) {
    this.groceriesService.getGroceries(page).subscribe(
      (groceries: Grocery[]) => {
        this.groceries = this.groceries
          ? this.groceries.concat(groceries)
          : groceries;

        this.page = page;

        // TODO: add items count to server response
        this.groceries.length === 1000
          ? this.disableInfiniteScroll()
          : this.completeInfiniteScroll();
      },
      (err) => {
        console.error('🚀 ~ ProductListPage ~ initGroceries ~ err', err);
        // TODO: handle error
      }
    );
  }

  private completeInfiniteScroll() {
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  private disableInfiniteScroll() {
    this.infiniteScroll.disabled = true;
  }
}
