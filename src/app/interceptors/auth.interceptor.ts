// src/app/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Utiliser from() pour convertir la Promise en Observable
    return from(this.keycloak.getValidToken()).pipe(
      switchMap(token => {
        console.log('Token dans interceptor:', token ? 'présent ✅' : 'absent ❌');
        if (token) {
          const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(cloned);
        }
        return next.handle(req);
      })
    );
  }
}
