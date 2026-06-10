import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Order} from '../../core/models/Order';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../core/services/cart-service';
import {Product} from '../../core/models/Product';
import {CartProduct} from '../../core/models/CartProduct';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-creation',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: './order-creation.html',
  styleUrl: './order-creation.scss',
})
export class OrderCreation {

  private fb = inject(FormBuilder);
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);

  public orderItems = this.cartService.cartItems;

  checkoutForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    deliveryAddress: ['', [Validators.required, Validators.minLength(5)]],
  });

  get total(): number {
    let total = 0;
    this.orderItems().forEach((value) => total += (value.product.price * value.quantity));
    return total;
  }

  hasError(controlName: keyof typeof this.checkoutForm.controls): boolean {
    const control = this.checkoutForm.controls[controlName];
    return control.invalid && control.touched;
  }

  submitOrder() {

  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
