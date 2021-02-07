import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async presentLoading() {
    const loading = await this.createLoading();
    await loading.present();

    return loading;
  }

  async presentToast(opts?: ToastOptions) {
    (await this.createToast(opts)).present();
  }

  private async createLoading() {
    return await this.loadingCtrl.create();
  }

  private async createToast(opts: ToastOptions) {
    const TOAST_OPTS = {
      color: 'dark',
      duration: 3000,
    };
    return await this.toastCtrl.create({ ...opts, ...TOAST_OPTS });
  }
}
