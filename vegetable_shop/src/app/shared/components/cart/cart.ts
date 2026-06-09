import {Component, inject} from '@angular/core';
import {CartService} from '../../../core/services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  private _cartService: CartService = inject(CartService);
  public cart = this._cartService.products;
}
