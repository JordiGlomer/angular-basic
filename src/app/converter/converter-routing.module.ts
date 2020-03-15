import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter.component';
import { DynamicConverterComponent } from './dynamic-converter/dynamic-converter.component';

const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: 'dynamic', component: DynamicConverterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConverterRoutingModule {}
