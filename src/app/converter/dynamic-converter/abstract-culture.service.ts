import { Injectable } from '@angular/core';

@Injectable()
export abstract class AbstractCultureService {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;

  constructor() {}
}
