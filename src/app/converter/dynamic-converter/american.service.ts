import { Injectable } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { AbstractCultureService } from './abstract-culture.service';

@Injectable()
export class AmericanService extends AbstractCultureService {
  sourceCulture = 'Europe';
  targetCulture = 'USA';
  constructor(private calculatorService: CalculatorService) {
    super();
  }
  public convertDistance = this.calculatorService.fromKilometersToMiles;
}
