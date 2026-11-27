import { Routes } from '@angular/router';
import { AppLayout } from './layout/app.layout';

import { Landing } from './public/landing/landing';
import { Login } from './public/login/login';
import { AccessDenied } from './public/AccessDenied/AccessDenied';
import { NotFound } from './public/not-found/not-found';
import { Bobo } from './private/bobo/bobo';
import { Users } from './private/users/users';
import { PresentationTable } from './private/presentation-table/presentation-table';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'presentation-table', pathMatch: 'full' },
      { path: 'bobo', component: Bobo },
      { path: 'users', component: Users },
      { path: 'presentation-table', component: PresentationTable },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'login', component: Login },
  { path: 'denied', component: AccessDenied },
  { path: '**', pathMatch: 'full', component: NotFound },
];
