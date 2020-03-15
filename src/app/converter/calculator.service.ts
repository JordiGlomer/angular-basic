import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private milesPerKilometer = 0.62137;
  private kilometersPerMile = 1.609;

  constructor() {}

  fromKilometersToMiles = (kilometers: number): number => kilometers * this.milesPerKilometer;
  fromMilesToKilometers = (miles: number): number => miles * this.kilometersPerMile;
}
