import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RocketsComponent } from './rockets.component';

const routes: Routes = [
  { path: '', component: RocketsComponent },
  {
    path: 'nasa',
    loadChildren: () => import('./nasa/nasa.module').then(m => m.NasaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RocketsRoutingModule {}
