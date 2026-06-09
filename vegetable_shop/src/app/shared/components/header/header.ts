import { Component } from '@angular/core';
import {Cart} from '../cart/cart';
import {SearchInput} from '../search-input/search-input';

@Component({
  selector: 'app-header',
  imports: [
    Cart,
    SearchInput
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
