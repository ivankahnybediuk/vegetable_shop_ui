import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Order} from '../../core/models/Order';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../core/services/cart-service';
import {Product} from '../../core/models/Product';
import {CartProduct} from '../../core/models/CartProduct';
import {Router} from '@angular/router';
import {OrderService} from '../../core/services/order-service';
import {ICartItem} from '../../core/models/interfaces/ICartItem';

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
  private orderService: OrderService = inject(OrderService);

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
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const order: Order = {
      name: this.checkoutForm.controls.firstName.value,
      lastname: this.checkoutForm.controls.lastName.value,
      email: this.checkoutForm.controls.email.value,
      phone: this.checkoutForm.controls.phone.value,
      address: this.checkoutForm.controls.deliveryAddress.value,

      items: this.orderItems().map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      } as ICartItem))
    };

    this.orderService.createOrder(order).subscribe({
      next: (order) => {
        this.cartService.clearCart();
        this.router.navigate(['/success'], {
          state: {
            order: order
          }
        });
      },
      error: err => {
        console.error(err);
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
