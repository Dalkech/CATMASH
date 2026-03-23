import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import LoadingService from '../components/loader/loader.component';
import { catchError, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      // Log or show message
      console.error(`HTTP Error while requesting ${req.method} ${req.url}: ${error.message}`);
      return throwError(() => error);
    })
  );
};
