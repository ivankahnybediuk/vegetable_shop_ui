import {Component, effect, HostListener, inject} from '@angular/core';
import {ProductCard} from '../../shared/components/product-card/product-card';
import {CategoryService} from '../../core/services/category-service';
import {ProductService} from '../../core/services/product-service';
import {Spinner} from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard,
    Spinner
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {

  categoryService: CategoryService = inject(CategoryService);
  productService: ProductService = inject(ProductService);

  public products  = this.productService.products;
  public currentCategory = this.categoryService.currentCategory;
  public isProductsLoading = this.productService.isLoading;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    const nearBottom = scrollPosition >= pageHeight - 300;

    if (nearBottom) {
      this.productService.loadProducts(this.currentCategory());
    }
  }
  constructor() {
  }

  ngOnInit(): void {

  }

}
