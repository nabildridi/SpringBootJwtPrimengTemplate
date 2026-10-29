import { Routes } from '@angular/router';
import { Users } from './private/users/users';
import { Login } from './public/login/login';
import { NotFound } from './public/not-found/not-found';
import { Landing } from './public/landing/landing';
import { AppLayout } from './layout/component/app.layout';
import { Bobo } from './private/bobo/bobo';
import { ComponentTester } from './private/component-tester/component-tester';
import { StepperTester } from './private/stepper-tester/stepper-tester';
import { FilteredDropdown } from './private/filtered-dropdown/filtered-dropdown';
import { DropVersionTwo } from './private/drop-version-two/drop-version-two';

export const routes: Routes = [
  {
    path: 'private',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'filtered-list-v2', pathMatch: 'full' },
      { path: 'users', component: Users },
      { path: 'bobo', component: Bobo },
      { path: 'tester', component: ComponentTester },
      {
        path: 'stepper',
        component: StepperTester,
      },
      {
        path: 'filtered-list',
        component: FilteredDropdown,
      },
      {
        path: 'filtered-list-v2',
        component: DropVersionTwo,
      },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: Landing },

  { path: 'login', component: Login },
  { path: '**', pathMatch: 'full', component: NotFound },
];
