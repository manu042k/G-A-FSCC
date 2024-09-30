import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';

/**
 * Interceptor for handling authentication and API errors.
 *
 **/
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const unProtectedUrls = [
    'http://localhost:8000/products/api/category/',
    'http://localhost:8000/products/api/items/',
    'http://localhost:8000/products/api/items/by-category/',
    'http://localhost:8000/users/login',
    'http://localhost:8000/users/register',
  ];

  const token = localStorage.getItem('accessToken');

  const isUnprotectedUrl = unProtectedUrls.some((url) => req.url.includes(url));

  if (isUnprotectedUrl) {
    return next(req).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }

  if (!token) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized: Access token is missing',
        })
    );
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(req).pipe(
    tap(),
    catchError((error: HttpErrorResponse) => {
      console.error('API Error:', error);
      return throwError(() => error);
    })
  );
};
