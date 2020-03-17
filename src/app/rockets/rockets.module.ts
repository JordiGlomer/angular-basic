import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RocketsRoutingModule } from './rockets-routing.module';
import { RocketsComponent } from './rockets.component';

@NgModule({
  declarations: [RocketsComponent],
  imports: [CommonModule, RocketsRoutingModule, HttpClientModule],
})
export class RocketsModule {}
