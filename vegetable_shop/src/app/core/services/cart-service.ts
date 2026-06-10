import {computed, Injectable, signal} from '@angular/core';
import {ICartItem} from '../models/interfaces/ICartItem';
import {Product} from '../models/Product';
import {CartProduct} from '../models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly _products = signal( new Map<number, CartProduct>());
  public readonly products = this._products.asReadonly();

  public readonly cartItems= computed(() => Array.from(this._products().values()));


  public changeQuantity(product: Product, quantity: number): void {
    this._products.update(current => {
      const updated = new Map(current);

      if (quantity > 0) {
        updated.set(product.id, {
          product,
          quantity
        });
      } else {
        updated.delete(product.id);
      }

      return updated;
    });
  }

  clearCart() {
    this._products.set(new Map<number, CartProduct>())
  }
}
