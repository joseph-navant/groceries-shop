import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
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
  cartGroceries: Grocery[];
  cartQuantity = 0;
  groceries: Grocery[];
  private page = 1;

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly groceriesService: GroceriesService,
    private readonly navCtrl: NavController
  ) {}

  ngOnInit() {
    this.initCart();
    this.initGroceries();
  }

  onAddGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  onRemoveGrocery(grocery: Grocery) {
    this.cartHelper.remove(grocery);
  }

  onFavGrocery(grocery: Grocery) {
    this.favGrocery(grocery);
  }

  onNavToCart() {
    this.navToCart();
  }

  loadNextGroceriesPage() {
    this.loadGroceries(++this.page);
  }

  private initCart() {
    this.cartHelper.cart$.subscribe((cartGroceries: Grocery[]) => {
      let cartQuantity = 0;
      for (const cartGrocery of cartGroceries) {
        cartQuantity += cartGrocery.unitsInCart;
      }

      this.cartGroceries = cartGroceries;
      this.cartQuantity = cartQuantity;
    });
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

  private favGrocery(grocery: Grocery) {
    this.groceriesService.favGrocery(grocery);
  }

  private completeInfiniteScroll() {
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  private disableInfiniteScroll() {
    this.infiniteScroll.disabled = true;
  }

  private navToCart() {
    this.navCtrl.navigateForward('/cart', {
      state: { cartGroceries: this.cartGroceries },
    });
  }
}
