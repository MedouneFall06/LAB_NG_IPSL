import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit-service.service';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import {BtnRetourComponent} from '../../components/btn-retour/btn-retour';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-produit-modifier',
  imports: [ReactiveFormsModule, CommonModule, BtnRetourComponent], // IMPORTANT: Ajouter RouterLink ici
  standalone: true,
  templateUrl: './produit-modifier.html',
  styleUrl: './produit-modifier.scss'
})
export class ProduitModifier implements OnInit {
  produitForm = new FormGroup({
    id: new FormControl(0),
    nom: new FormControl('', [Validators.required, Validators.minLength(2)]),
    prix: new FormControl('', [Validators.required, Validators.min(0.01)]),
    quantite: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
  });

  loading = false;
  errorMessage = '';

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.produitService.getById(id).subscribe({
        next: (produit) => {
          this.produitForm.patchValue({
            id: produit?.id,
            nom: produit?.nom,
            prix: produit?.prix.toString(),
            quantite: produit?.quantite.toString(),
            description: produit?.description
          });
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

  modifierProduit() {
    if (this.produitForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire';
      return;
    }

    this.loading = true;
    const formValue = this.produitForm.value;

    const produit: Produit = {
      id: formValue.id!,
      nom: formValue.nom!,
      prix: Number(formValue.prix),
      quantite: Number(formValue.quantite),
      description: formValue.description || '',
    };

    this.produitService.update(produit).subscribe({
      next: () => {
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  // Méthode alternative pour la navigation par programme
  retourAListe() {
    this.router.navigate(['/produits']);
  }
}
