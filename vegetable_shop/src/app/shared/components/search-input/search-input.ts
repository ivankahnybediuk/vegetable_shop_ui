import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../../core/services/product-service';
import {Product} from '../../../core/models/Product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-input',
  imports: [
    FormsModule
  ],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);

  public suggestions = this.productService.searchResult;
  searchText: string = "";

  onSearchChange() {
    this.productService.searchProducts(this.searchText);
  }
  ngOnInit() {
    this.suggestions = this.productService.searchResult;
  }

  cleanSearch() {
    this.searchText = "";
    this.onSearchChange();
  }

  reloadProducts() {
    this.productService.loadProductsByName(this.searchText);
    this.scrollToProducts();
    this.cleanSearch();
    (document.activeElement as HTMLElement)?.blur();
  }

  choseSuggestion(product: string) {
    this.searchText = product;
    this.reloadProducts();
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
