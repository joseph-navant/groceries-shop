import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { take } from 'rxjs/internal/operators';
import { Grocery } from 'src/app/core/models/grocery';
import { CartHelper } from 'src/app/core/services/helper/cart-helper.service';
import { GroceriesService } from 'src/app/core/services/http/groceries.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  areFavorites = false;
  groceries: Grocery[];
  cart$ = this.cartHelper.cart$;
  private loading: HTMLIonLoadingElement;
  private page: number;

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly groceriesService: GroceriesService,
    private readonly loadingCtrl: LoadingController,
    private readonly menu: MenuController
  ) {}

  ngOnInit() {
    this.initGroceries();
  }

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }

  onShowCart() {
    this.menu.open();
  }

  onShowAll() {
    this.areFavorites = false;
    this.initGroceries();
  }

  onShowFavorites() {
    this.areFavorites = true;
    this.initGroceries();
  }

  async onFavGrocery(grocery: Grocery, index: number) {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this.favGrocery(grocery, index);
  }

  loadNextGroceriesPage() {
    this.loadGroceries(++this.page);
  }

  private initGroceries() {
    this.groceries = null;
    this.page = 1;
    this.loadGroceries(this.page);
  }

  private loadGroceries(page: number) {
    this.groceriesService
      .getGroceries(page, this.areFavorites)
      .pipe(take(1)) // TODO: use NgRx Effects instead ?
      .subscribe(
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

  private favGrocery(grocery: Grocery, index: number) {
    this.groceriesService.favGrocery(grocery).subscribe(
      (updatedGrocery: Grocery) => {
        this.groceries[index] = updatedGrocery;
        this.loading.dismiss();
      },
      (err) => {
        this.loading.dismiss();
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
