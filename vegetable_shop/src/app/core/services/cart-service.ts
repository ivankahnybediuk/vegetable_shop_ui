import {computed, Injectable, signal} from '@angular/core';
import {ICartItem} from '../models/interfaces/ICartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly _products = signal( new Map<number, ICartItem>());
  public readonly products = this._products.asReadonly();

  public readonly cartQuantity = computed(() => this._products().size);


  public changeQuantity(id:number, quantity: number) {
    if(quantity > 0){
      if (this._products().has(id)){
        this._products().get(id)!.quantity = quantity;
      } else {
        this._products().set(id, {id, quantity});
      }
    } else if(quantity == 0){
      this._products().delete(id);
    }
  }
}
