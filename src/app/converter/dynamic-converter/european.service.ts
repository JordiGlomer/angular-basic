import { Injectable } from '@angular/core';
import { CalculatorService } from '../calculator.service';
import { AbstractCultureService } from './abstract-culture.service';

@Injectable()
export class EuropeanService extends AbstractCultureService {
  sourceCulture = 'USA';
  targetCulture = 'Europe';
  constructor(private calculatorService: CalculatorService) {
    super();
  }
  public convertDistance = this.calculatorService.fromMilesToKilometers;
}
