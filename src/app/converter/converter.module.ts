import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { CalculatorService } from './calculator.service';
import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter.component';
import { AmericanService } from './dynamic-converter/american.service';
import { DynamicConverterComponent } from './dynamic-converter/dynamic-converter.component';
import { EuropeanService } from './dynamic-converter/european.service';
import { AbstractCultureService } from './dynamic-converter/abstract-culture.service';

const cultureFactory = (calculatorService: CalculatorService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeanService(calculatorService);
  } else {
    return new AmericanService(calculatorService);
  }
};

@NgModule({
  declarations: [ConverterComponent, DynamicConverterComponent],
  imports: [CommonModule, ConverterRoutingModule, FormsModule],
  // providers: [CalculatorService],
  // providers: [
  //   {
  //     provide: AbstractCultureService,
  //     useClass: AmericanService,
  //   },
  // ],
  // providers: [{ provide: AbstractCultureService, useValue: new EuropeanService(new CalculatorService()) }],
  providers: [
    {
      provide: AbstractCultureService,
      useFactory: cultureFactory,
      deps: [CalculatorService],
    },
  ],
})
export class ConverterModule {}
