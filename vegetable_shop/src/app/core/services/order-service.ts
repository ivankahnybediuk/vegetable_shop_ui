import {inject, Injectable, Signal} from '@angular/core';
import {CartProduct} from '../models/CartProduct';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environments';
import {Order} from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http: HttpClient = inject(HttpClient);


  createOrder(order: Order) {
    return this.http.post(
      `${environment.apiUrl}/orders`,
      order
    );
  }
}
