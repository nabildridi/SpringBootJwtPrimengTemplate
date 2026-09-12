import { Routes } from '@angular/router';
import { Users } from './private/users/users';
import { Login } from './public/login/login';
import { NotFound } from './public/not-found/not-found';
import { Landing } from './public/landing/landing';
import { AppLayout } from './layout/component/app.layout';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: Users },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },

  { path: 'login', component: Login },
  { path: '**', pathMatch: 'full', component: NotFound },
];
