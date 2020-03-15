import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MoneyRoutingModule } from './money-routing.module';
import { MoneyComponent } from './money.component';

@NgModule({
  declarations: [MoneyComponent],
  imports: [CommonModule, MoneyRoutingModule, HttpClientModule],
})
export class MoneyModule {}
