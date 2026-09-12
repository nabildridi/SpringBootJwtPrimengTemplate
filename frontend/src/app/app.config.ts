import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoadingInterceptorService } from './services/interceptors/loading-interceptor.service';

import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';
import Lara from '@openng/optimus-ui-themes/lara';
import Nora from '@openng/optimus-ui-themes/nora';
import Material from '@openng/optimus-ui-themes/material';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { definePreset } from '@openng/optimus-ui-themes';

export const AppPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#f5f7ff',
      100: '#e1e7ff',
      200: '#cbd5ff',
      300: '#a3b4ff',
      400: '#748aff',
      500: '#4f5eff', // <-- Your core primary brand color
      600: '#3d42ff',
      700: '#312eff',
      800: '#2826cc',
      900: '#2424a3',
      950: '#15145c',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    MessageService,
    ConfirmationService,
    provideOptimus({
      theme: {
        preset: AppPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true,
    },
  ],
};
