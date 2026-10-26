import { Routes } from '@angular/router';
import { Users } from './private/users/users';
import { Login } from './public/login/login';
import { NotFound } from './public/not-found/not-found';
import { Landing } from './public/landing/landing';
import { AppLayout } from './layout/component/app.layout';
import { Bobo } from './private/bobo/bobo';
import { ComponentTester } from './private/component-tester/component-tester';
import { StepperTester } from './private/stepper-tester/stepper-tester';
import { ProductStepOne } from './private/product-steps/product-step-one/product-step-one';
import { MarquesAddUpdate } from './private/marques-add-update/marques-add-update';
import { FormArrayTester } from './private/form-array-tester/form-array-tester';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'form-array-tester', pathMatch: 'full' },
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
        path: 'form-array-tester',
        component: FormArrayTester,
      },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },

  { path: 'login', component: Login },
  { path: '**', pathMatch: 'full', component: NotFound },
];
