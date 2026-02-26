import { Routes } from '@angular/router';
import { ProduitAjout } from './pages/produit-ajout/produit-ajout';
import { ProduitList } from './pages/produit-list/produit-list';
import { ProduitModifier } from './pages/produit-modifier/produit-modifier';
import { ProduitDetails } from './pages/produit-details/produit-details';
import { Error404 } from './pages/error404/error404';

export const routes: Routes = [
  { path: '', redirectTo: '/produits', pathMatch: 'full' },
  { path: 'produits', component: ProduitList },
  { path: 'produits/ajout', component: ProduitAjout }, // 👈 Vérifiez que cette route existe
  { path: 'produits/modifier/:id', component: ProduitModifier },
  { path: 'produits/detail/:id', component: ProduitDetails },
  { path: '**', component: Error404 }
];
