import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { RouterLink } from '@angular/router'; // Important !

@Component({
  selector: 'app-produit-item-div',
  imports: [RouterLink], // RouterLink doit être dans les imports
  standalone: true,
  templateUrl: './produit-item-div.html',
  styleUrl: './produit-item-div.scss',
})
export class ProduitItemDiv {
  @Input() produit: Produit | undefined;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    if (this.produit?.id) {
      if (confirm(`Voulez-vous vraiment supprimer le produit "${this.produit.nom}" ?`)) {
        this.delete.emit(this.produit.id);
      }
    }
  }
}
