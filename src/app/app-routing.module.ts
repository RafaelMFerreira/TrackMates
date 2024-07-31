import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GemCalculatorComponent } from './pages/gem-calculator/gem-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/gem-calculator', pathMatch: 'full' },
  { path: 'gem-calculator', component: GemCalculatorComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
