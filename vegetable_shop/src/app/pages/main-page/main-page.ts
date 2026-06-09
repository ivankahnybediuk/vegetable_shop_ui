import {Component, effect, HostListener, inject} from '@angular/core';
import {CategoryCard} from '../../shared/components/category_card/category-card.component';
import {CategoryService} from '../../core/services/category-service';
import {Products} from '../products/products';
import {Spinner} from '../../shared/components/spinner/spinner';


@Component({
  selector: 'app-main-page',
  imports: [
    CategoryCard,
    Products,
    Spinner
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  categoryService: CategoryService = inject(CategoryService);

  public categories = this.categoryService.categories;
  public isCategoriesLoading = this.categoryService.isLoading;


  ngOnInit(): void {
    this.categoryService.loadCategories();
  }

  scrollToProducts(): void {
    const element = document.getElementById('products');

    if (!element) return;

    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }
}
