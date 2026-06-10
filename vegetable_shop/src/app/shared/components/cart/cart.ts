import {Component, effect, inject} from '@angular/core';
import {CartService} from '../../../core/services/cart-service';
import {Router} from '@angular/router';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private router: Router = inject(Router);
  private _cartService: CartService = inject(CartService);
  public cart = this._cartService.products;

  constructor() {
    effect(() => {
      let items = this._cartService.products();
    });
  }
  navigateToOrder() {
    this.router.navigate(['/order']);
  }


}
