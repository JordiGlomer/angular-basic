import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarRoutingModule } from './car-routing.module';
import { CarComponent } from './car.component';
import { DisplayPresenterComponent } from './display-presenter/display-presenter.component';
import { PedalsPresenterComponent } from './pedals-presenter/pedals-presenter.component';

@NgModule({
  declarations: [CarComponent, DisplayPresenterComponent, PedalsPresenterComponent],
  imports: [CommonModule, CarRoutingModule],
})
export class CarModule {}
