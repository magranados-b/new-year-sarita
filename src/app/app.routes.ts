import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'new-year',
    loadComponent: () => import('./home/home.component'),
  },
    {
    path: '**',
    redirectTo: 'new-year'
  }
];
