import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';
import {environment} from '../../../../environments/environments';
import {IProduct} from '../models/interfaces/IProduct';
import {IPaginatedResult} from '../models/interfaces/IPaginatedResult';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http: HttpClient = inject(HttpClient);
  private _products = signal<Product[]>([]);
  public products = this._products.asReadonly();

  private readonly _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  private _currentPage: number = 0;
  private _totalPages: number = 1;
  private _categoryId: number = 0;

  loadProducts(categoryId: number) {
    if(this._isLoading()) return;

    if(categoryId != 0 && categoryId != this._categoryId){
      this._categoryId = categoryId;
      this._currentPage = 0;
      this._totalPages =1;
      this._products.set([]);
    }
    if(this._currentPage == this._totalPages) return;
    this._isLoading.set(true)
    this._currentPage++;
    if(categoryId > 0) {
      this.loadProductsByCategory(categoryId);
    }
    else this.loadAllProducts();
  }

  private loadProductsByCategory(categoryId: number) {
    this.http.get<IPaginatedResult<IProduct>>(environment.apiUrl + '/products/category/' + categoryId +"?page=" + this._currentPage)
      .subscribe({
      next: (response) => {
        this._products.update(current => [...current, ...response.items.map(i => new Product(i))]);
        this._currentPage = response.page;
        this._totalPages = response.totalPages;
        setTimeout(() => {
          this._isLoading.set(false);
        }, 5000);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this._isLoading.set(false)
      }
    })
  }

  private loadAllProducts(): void {

    this.http.get<IPaginatedResult<IProduct>>(environment.apiUrl + '/products'+"?page=" + this._currentPage)
      .subscribe({
      next: (response) => {
        this._products.update(current => [...current, ...response.items.map(i => new Product(i))]);
        this._currentPage = response.page;
        this._totalPages = response.totalPages;
        setTimeout(() => {
          this._isLoading.set(false);
        }, 5000);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this._isLoading.set(false)
      }
    })
  }



}
