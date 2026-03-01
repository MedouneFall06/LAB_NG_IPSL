import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { KeycloakService } from './services/keycloak.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 1. D'abord initialiser Keycloak (AVANT HttpClient)
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    // 2. Ensuite HttpClient avec intercepteurs
    provideHttpClient(withInterceptorsFromDi()),
    // 3. Enfin les intercepteurs
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
