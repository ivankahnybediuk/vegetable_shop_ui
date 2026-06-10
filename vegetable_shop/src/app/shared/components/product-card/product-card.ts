import {Component, computed, inject, input, signal} from '@angular/core';
import {Product} from '../../../core/models/Product';
import {CurrencyPipe, NgClass} from '@angular/common';
import {UnitsType} from '../../../core/models/enums/UnitsType';
import {FormsModule} from '@angular/forms';
import {CartService} from '../../../core/services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  private cartService: CartService = inject(CartService);
  public product = input<Product>();
  public quantity:number = 0;
  public imageLoaded = signal(false);

  ngOnInit() {
    this.quantity = this.cartService.products().get(this.product()!.id)?.quantity ?? 0;
  }

  reduceQuantity(){
    if(this.quantity > 0){
      if(this.product()?.unit == UnitsType.Pcs) this.quantity--;
      else this.quantity = this.quantity - 0.5;
    }
  }

  addQuantity(){
    if(this.quantity < this.product()!.stockQuantity ){
      if(this.product()?.unit == UnitsType.Pcs) this.quantity++;
      else this.quantity = this.quantity + 0.5;
    }
  }

  addToCart(){
    if(this.quantity > 0){
      if(this.quantity <= this.product()!.stockQuantity ){
        this.cartService.changeQuantity(this.product()!, this.quantity);
      }
    }
  }
}
