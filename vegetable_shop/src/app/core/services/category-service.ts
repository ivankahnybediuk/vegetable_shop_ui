import {inject, Injectable, signal} from '@angular/core';
import {Category} from '../models/Category';
import {environment} from '../../../../environments/environments';
import {ICategory} from '../models/interfaces/ICategory';
import {CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly http: HttpClient = inject(HttpClient);
  private readonly _categories = signal<Category[]>([]);
  public readonly  categories = this._categories.asReadonly();

  private readonly _currentCategory = signal<number>(0);
  public readonly currentCategory = this._currentCategory.asReadonly();

  private readonly _isLoading = signal<boolean>(false);
  public readonly isLoading = this._isLoading.asReadonly();

  public loadCategories(): void{
    this._isLoading.set(true);
    this.http.get<ICategory[]>(environment.apiUrl + '/categories').subscribe({
      next: (categories: ICategory[])=> {
        this._categories.set(
        categories.map(c => new Category(c)));
        this._isLoading.set(false);
      },
      error: (err: any)=> {
        console.error('Failed to load categories', err);
        this._isLoading.set(false);},
    })
  }

  public setCurrentCategory(id:number){
    this._currentCategory.set(id)
  }

}
