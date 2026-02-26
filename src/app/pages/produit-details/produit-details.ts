import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BtnRetourComponent } from '../../components/btn-retour/btn-retour'; // Import du composant réutilisable

@Component({
  selector: 'app-produit-details',
  imports: [CommonModule, RouterLink, BtnRetourComponent], // Ajouter BtnRetourComponent
  standalone: true,
  templateUrl: './produit-details.html',
  styleUrl: './produit-details.scss'
})
export class ProduitDetails implements OnInit {
  produit: Produit | undefined;
  loading = false;
  errorMessage = '';

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.produitService.getById(id).subscribe({
        next: (data) => {
          this.produit = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'ID produit manquant';
      this.loading = false;
    }
  }
}
