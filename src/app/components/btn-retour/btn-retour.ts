import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-btn-retour',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './btn-retour.html',
  styleUrl: './btn-retour.scss'
})
export class BtnRetourComponent {
  @Input() route: string = '/produits';
  @Input() texte: string = 'Retour à la liste';
  @Input() couleur: string = 'primary'; // primary, secondary, danger
}
