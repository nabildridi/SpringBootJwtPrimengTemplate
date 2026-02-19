import { Routes } from '@angular/router';
import { Users } from './private/users/users';
import { Login } from './public/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: Users },
  { path: 'login', component: Login },
];
