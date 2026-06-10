import {Component, inject} from '@angular/core';
import {Cart} from '../cart/cart';
import {SearchInput} from '../search-input/search-input';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-header',
  imports: [
    Cart,
    SearchInput
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router: Router = inject(Router);

  public currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );


}
