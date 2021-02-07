import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { Grocery } from 'src/app/core/models/grocery';
import { CartHelper } from 'src/app/core/services/helper/cart-helper.service';
import { GroceriesService } from 'src/app/core/services/http/groceries.service';
import { UIService } from 'src/app/core/services/internal/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll: IonInfiniteScroll;
  cartGroceries: Grocery[];
  groceries: Grocery[];
  private page = 1;

  constructor(
    private readonly cartHelper: CartHelper,
    private readonly groceriesService: GroceriesService,
    private readonly navCtrl: NavController,
    private readonly uiService: UIService
  ) {}

  ngOnInit() {
    this.initCart();
    this.initGroceries();
  }

  onAddGrocery(grocery: Grocery) {
    const isAlreadyAdded = this.cartGroceries.some((g) => g.id === grocery.id);
    isAlreadyAdded ? this.plusUnits(grocery) : this.addGrocery(grocery);
    this.uiService.presentToast({ message: `${grocery.productName} added` });
  }

  onPlusUnits(grocery: Grocery) {
    // TODO
  }

  onMinusUnits(grocery: Grocery) {
    // TODO
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
      this.cartGroceries = cartGroceries;
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

  private addGrocery(grocery: Grocery) {
    this.cartHelper.add(grocery);
  }

  private plusUnits(grocery: Grocery) {
    // TODO
  }

  minusUnits(grocery: Grocery) {
    // TODO
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
