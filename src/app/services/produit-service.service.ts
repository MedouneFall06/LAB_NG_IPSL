import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  // URL de votre backend Spring Boot
  private apiUrl = 'http://localhost:8086/api/produits';

  // Injection du HttpClient
  constructor(private http: HttpClient) { }

  // Récupérer tous les produits
  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  // Récupérer un produit par ID
  getById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un produit
  add(produit: Omit<Produit, 'id'>): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // Mettre à jour un produit
  update(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${produit.id}`, produit);
  }

  // Supprimer un produit
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Rechercher des produits par mot-clé
  searchProduits(keyword: string): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }
}
