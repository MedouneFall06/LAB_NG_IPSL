import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private produits: Produit[] = [];
  private nextId: number = 1; // Compteur pour l'auto-incrément

  constructor() {
    this.initProduits();
  }

  // Initialiser avec les produits de test
  private initProduits(): void {
    const produitsInitiaux: Omit<Produit, 'id'>[] = [
      { nom: 'Ordinateur Portable', prix: 1200, quantite: 10, description: '' },
      { nom: 'Smartphone', prix: 800, quantite: 25, description: '' },
      { nom: 'Tablette', prix: 450, quantite: 15, description: '' },
      { nom: 'Casque Audio', prix: 150, quantite: 30, description: '' },
      { nom: 'Montre Connectée', prix: 200, quantite: 20, description: '' }
    ];

    // Ajouter les produits initiaux avec auto-incrément
    produitsInitiaux.forEach(produit => {
      this.produits.push({
        id: this.nextId++,
        ...produit
      });
    });
  }

  getAll(): Observable<Produit[]> {
    return of([...this.produits]).pipe(delay(500)); // Retourne une copie
  }

  getById(id: number): Observable<Produit | undefined> {
    const produit = this.produits.find(p => p.id === id);
    return of(produit ? { ...produit } : undefined).pipe(delay(500));
  }

  add(produit: Omit<Produit, 'id'>): Observable<Produit> {
    // Créer un nouveau produit avec ID auto-incrémenté
    const nouveauProduit: Produit = {
      id: this.nextId++,
      ...produit
    };

    this.produits.push(nouveauProduit);
    return of({ ...nouveauProduit }).pipe(delay(500));
  }

  update(produit: Produit): Observable<Produit> {
    const index = this.produits.findIndex(p => p.id === produit.id);
    if (index !== -1) {
      this.produits[index] = { ...produit };
    }
    return of({ ...produit }).pipe(delay(500));
  }

  delete(id: number): Observable<boolean> {
    // Logique de suppression
    const index = this.produits.findIndex(p => p.id === id);
    if (index !== -1) {
      this.produits.splice(index, 1); // Supprime du tableau
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  // Méthode utilitaire pour réinitialiser (optionnel)
  reset(): void {
    this.produits = [];
    this.nextId = 1;
    this.initProduits();
  }
}
