import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'ab-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  public kilometers = 0;
  public miles: number;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.convert();
  }

  convert() {
    this.miles = this.calculatorService.fromKilometersToMiles(this.kilometers);
  }
}
