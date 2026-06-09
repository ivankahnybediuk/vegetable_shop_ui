import {Component, inject, input} from '@angular/core';
import {Category} from '../../../core/models/Category';
import {CategoryService} from '../../../core/services/category-service';
import {ProductService} from '../../../core/services/product-service';
import {ICategory} from '../../../core/models/interfaces/ICategory';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCard {

  private categoryService: CategoryService = inject(CategoryService);
  private productService: ProductService = inject(ProductService);

  defaultCategory: Category = new Category({
    id: 0,
    name: ""
  } as ICategory);
  public category = input<Category>(this.defaultCategory);

  setCategory() {
    console.log("SET new category");
    this.categoryService.setCurrentCategory(this.category()!.id);
    this.productService.loadProducts(this.category()!.id);
  }
}
