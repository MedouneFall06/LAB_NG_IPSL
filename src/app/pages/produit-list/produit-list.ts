import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { KeycloakService } from '../../services/keycloak.service';
import { ProduitItemDiv } from '../produit-item-div/produit-item-div';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// IMPORTANT: Ne PAS importer RouterLink ici car non utilisé
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-produit-list',
  imports: [
    ProduitItemDiv,
    CommonModule,
    FormsModule,
    NavbarComponent  // Seulement ce dont vous avez besoin
  ],
  standalone: true,
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList implements OnInit {
  produits: Produit[] = [];
  loading = false;
  errorMessage = "";
  searchTerm: string = '';
  username: string = '';

  constructor(
    private produitService: ProduitService,
    private keycloak: KeycloakService
  ) {}

  ngOnInit(): void {
    this.username = this.keycloak.getUsername();  // Maintenant ça retourne la valeur stockée
    console.log('Username récupéré:', this.username);
    this.loadProduits();
  }

  loadProduits() {
    this.loading = true;
    this.produitService.getAll().subscribe({
      next: (data: Produit[]) => {
        console.log('Produits reçus:', data);  // Vérifiez les quantités
        this.produits = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = `Erreur: ${err.message}`;
        this.loading = false;
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    if (this.searchTerm.trim()) {
      this.produitService.searchProduits(this.searchTerm).subscribe({
        next: (data) => this.produits = data
      });
    } else {
      this.loadProduits();
    }
  }

  deleteProduit(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.produitService.delete(id).subscribe({
        next: () => {
          this.loadProduits();
        },
        error: (err: any) => {
          this.errorMessage = `Erreur lors de la suppression: ${err.message}`;
        }
      });
    }
  }

  logout(): void {
    this.keycloak.logout();
  }
}
