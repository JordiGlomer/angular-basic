import { Injectable } from '@angular/core';

@Injectable()
export class AbstractCultureService {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;

  constructor() {}
}
