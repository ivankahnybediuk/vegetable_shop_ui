import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/main-page/main-page')
      .then(m => m.MainPage)
  },
  {
    path: 'order',
    loadComponent: () => import('./pages/order-creation/order-creation')
      .then(m => m.OrderCreation)
  },
  {
    path: 'success',
    loadComponent: () => import('./pages/success-page/success-page')
      .then(m => m.SuccessPage)
  }
];
