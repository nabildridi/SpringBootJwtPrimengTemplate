import { Routes } from '@angular/router';
import { Users } from './private/users/users';
import { Login } from './public/login/login';
import { NotFound } from './public/not-found/not-found';
import { Landing } from './public/landing/landing';
import { AppLayout } from './layout/component/app.layout';
import { Bobo } from './private/bobo/bobo';
import { ComponentTester } from './private/component-tester/component-tester';
import { StepperTester } from './private/stepper-tester/stepper-tester';
import { MarquesAddUpdate } from './private/marques-add-update/marques-add-update';
import { TristateControl } from './shared/tristate-control/tristate-control';
import { ButtonSelect } from './shared/button-select/button-select';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'button-select', pathMatch: 'full' },
      { path: 'users', component: Users },
      { path: 'bobo', component: Bobo },
      { path: 'tester', component: ComponentTester },
      {
        path: 'stepper',
        component: StepperTester,
      },
      {
        path: 'marques',
        component: MarquesAddUpdate,
      },
      {
        path: 'button-select',
        component: ButtonSelect,
      },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },

  { path: 'login', component: Login },
  { path: '**', pathMatch: 'full', component: NotFound },
];
