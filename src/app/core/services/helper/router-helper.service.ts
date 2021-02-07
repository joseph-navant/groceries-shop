import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterHelper {
  constructor(private readonly router: Router) {}

  /**
   * Use it while the navigation is in-progress like on 'ngOnInit'.
   * Have a look at Angular state doc.
   */
  getState() {
    const currentNav = this.router.getCurrentNavigation();
    return currentNav && currentNav.extras && currentNav.extras.state
      ? currentNav.extras.state
      : null;
  }
}
