import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoHomeComponent } from './go-home/go-home.component';

@NgModule({
  declarations: [GoHomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [GoHomeComponent],
})
export class SharedModule {}
