import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GemCalculatorComponent } from './pages/gem-calculator/gem-calculator.component';
import { InventoryLookupComponent } from './pages/inventory-lookup/inventory-lookup.component';

const routes: Routes = [
  { path: '', redirectTo: '/gem-calculator', pathMatch: 'full' },
  { path: 'gem-calculator', component: GemCalculatorComponent },
  { path: 'inventory-lookup', component: InventoryLookupComponent },

  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
