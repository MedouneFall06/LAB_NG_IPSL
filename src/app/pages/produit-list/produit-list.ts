import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { ProduitItemDiv } from '../produit-item-div/produit-item-div';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // 👈 IMPORTANT: Ajouter cet import

@Component({
  selector: 'app-produit-list',
  imports: [
    ProduitItemDiv,
    CommonModule,
    RouterLink  // 👈 IMPORTANT: Ajouter RouterLink aux imports
  ],
  standalone: true, // Vérifiez que c'est bien standalone
  templateUrl: './produit-list.html',
  styleUrl: './produit-list.scss',
})
export class ProduitList implements OnInit {

  produits: Produit[] = [];
  loading = false;
  errorMessage = "";

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits() {
    this.loading = true;
    this.produitService.getAll().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
      },
      error: (err: any) => {
        this.errorMessage = `Erreur: ${err.message}`;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
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
}
