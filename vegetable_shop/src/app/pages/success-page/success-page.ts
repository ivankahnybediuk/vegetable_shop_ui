import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-success-page',
  imports: [],
  templateUrl: './success-page.html',
  styleUrl: './success-page.scss',
})
export class SuccessPage {
  private router = inject(Router);
  order = history.state.order;

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
