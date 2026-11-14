import { Routes } from '@angular/router';
import { Login } from './public/login/login';
import { NotFound } from './public/not-found/not-found';
import { Landing } from './public/landing/landing';
import { Users } from './private/users/users';
import { Bobo } from './private/bobo/bobo';
import { AppLayout } from './layout/app.layout';
import { Registration } from './public/registration/registration';
import { ConfirmAccount } from './public/confirm-account/confirm-account';
import { ResetRequest } from './public/reset-request/reset-request';
import { WriteNewPassword } from './public/write-new-password/write-new-password';
import { AccessDenied } from './public/AccessDenied/AccessDenied';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'bobo', pathMatch: 'full' },
      { path: 'users', component: Users },
      { path: 'bobo', component: Bobo },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },
  { path: 'login', component: Login },
  { path: 'register', component: Registration },
  { path: 'confirmed', component: ConfirmAccount },
  { path: 'reset', component: ResetRequest },
  { path: 'setResetPassword', component: WriteNewPassword },
  { path: 'denied', component: AccessDenied },
  { path: '**', pathMatch: 'full', component: NotFound },
];
