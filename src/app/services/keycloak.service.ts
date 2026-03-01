// src/app/services/keycloak.service.ts

import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak;
  private username: string = '';  // Stocker le username

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8092',
      realm: 'produit',
      clientId: 'gestion-produits'
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: window.location.origin + '/'
      });

      if (authenticated) {
        // Forcer le rafraîchissement du token
        await this.keycloak.updateToken(30);

        // Stocker le username immédiatement
        this.username = this.keycloak.tokenParsed?.['preferred_username'] ||
          this.keycloak.tokenParsed?.['email'] ||
          'Utilisateur';

        console.log('✅ Keycloak initialisé');
        console.log('👤 Utilisateur connecté:', this.username);
        console.log('📦 Token parsé:', this.keycloak.tokenParsed);
      }
      return authenticated;
    } catch (error) {
      console.error('❌ Keycloak init failed', error);
      return false;
    }
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  async getValidToken(): Promise<string | undefined> {
    try {
      await this.keycloak.updateToken(30);
      return this.keycloak.token;
    } catch (error) {
      console.error('Token refresh failed', error);
      return undefined;
    }
  }

  logout(): void {
    this.keycloak.logout({ redirectUri: window.location.origin + '/' });
  }

  getUsername(): string {
    return this.username;  // Retourner la valeur stockée
  }

  hasRole(role: string): boolean {
    const roles = this.keycloak.tokenParsed?.['realm_access']?.['roles'] || [];
    return roles.includes(role);
  }
}
