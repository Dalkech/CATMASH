import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './apis/http.interceptor';
import { catReducer } from './store/cats/cats.reducer';
import { CatEffects } from './store/cats/cats.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideStore({ cats: catReducer }), 
    provideEffects([CatEffects]),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor]))]
};
