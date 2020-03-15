import { Component, OnInit } from '@angular/core';
import { AbstractCultureService } from './abstract-culture.service';

@Component({
  selector: 'ab-dynamic-converter',
  templateUrl: './dynamic-converter.component.html',
  styleUrls: ['./dynamic-converter.component.css'],
})
export class DynamicConverterComponent implements OnInit {
  public source: string;
  public target: string;
  public sourceDistance = 0;
  public targetDistance: number;
  constructor(private cultureConverterService: AbstractCultureService) {}

  public ngOnInit() {
    this.source = this.cultureConverterService.sourceCulture;
    this.target = this.cultureConverterService.targetCulture;
    this.convert();
  }

  public convert() {
    this.targetDistance = this.cultureConverterService.convertDistance(this.sourceDistance);
  }
}
