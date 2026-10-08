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
      50: '#F2F5FA', // Lightest shade
      100: '#C2CFE5',
      200: '#91A8D0',
      300: '#6182BB',
      400: '#305BA6',
      500: '#003591', // Your Brand Blue - this is the star of the show
      600: '#002D7B', // Hover state - slightly darker
      700: '#002566', // Active/Pressed state - even darker
      800: '#001D50',
      900: '#00153A',
      950: '#000D24', // Darkest shade
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}', // Default button color
          contrastColor: '#ffffff', // White text on blue buttons (because accessibility matters!)
          hoverColor: '{primary.600}', // What happens when you hover
          activeColor: '{primary.700}', // What happens when you click
        },
      },
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
          cssLayer: {
            name: 'optimus',
            order: 'theme, base, optimus',
          },
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
