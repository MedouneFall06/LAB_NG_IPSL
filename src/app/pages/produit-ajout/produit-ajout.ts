import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BtnRetourComponent} from '../../components/btn-retour/btn-retour';

@Component({
  selector: 'app-produit-ajout',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, BtnRetourComponent],
  standalone: true,
  templateUrl: './produit-ajout.html',
  styleUrl: './produit-ajout.scss',
})
export class ProduitAjout {
  produitForm = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    prix: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantite: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
  });

  loading = false;
  errorMessage = '';

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  ajoutProduit() {
    if (this.produitForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // On n'envoie PAS l'id, il sera généré par le service
    const nouveauProduit = {
      nom: this.produitForm.value.nom!,
      prix: Number(this.produitForm.value.prix),
      quantite: Number(this.produitForm.value.quantite),
      description: this.produitForm.value.description || ''
    };

    this.produitService.add(nouveauProduit).subscribe({
      next: (produitCree) => {
        console.log('Produit créé avec ID:', produitCree.id); // Pour debug
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de l\'ajout du produit';
        this.loading = false;
      }
    });
  }
}
