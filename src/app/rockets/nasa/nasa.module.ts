import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NasaRoutingModule } from './nasa-routing.module';
import { NasaComponent } from './nasa.component';
import { HoustonComponent } from './houston/houston.component';
import { FloridaComponent } from './florida/florida.component';


@NgModule({
  declarations: [NasaComponent, HoustonComponent, FloridaComponent],
  imports: [
    CommonModule,
    NasaRoutingModule
  ]
})
export class NasaModule { }
