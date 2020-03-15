# 5-Inject

## Servicios inyectables en Angular

---

# 1. Inyección de dependencias

# 2. Inversión del control

---

# 1. Inyección de dependencias

## Generación de servicios

## Consumo de dependencias

---

Módulo y componente

```console
ng g m converter --route converter --module app-routing.module
```

`header.component.html`

```html
<li><a routerLink="converter">Converter</a></li>
```

---

## 1.1 Generación de servicios

```console
ng g s converter/calculator
```

Implementación

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  constructor() {}

  convertFromKilometersToMiles = kilometers => kilometers * 0.621;
}
```

---

## 1.2 Consumo de dependencias

```typescript
export class ConverterComponent implements OnInit {
  public kilometers = 0;
  public miles: number;

 constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.convert();
  }

  convert() {
    this.miles = this.calculatorService.convertFromKilometersToMiles(this.kilometers);
  }
}
```

---

### Presentación en vista

```html
<h2>Distance Converter.</h2>
<h3>From Europe to USA</h3>
<form>
  <fieldset>
    <section>
      <label for="kilometers">Kilometers</label>
      <input
        name="kilometers"
        type="number"
        [(ngModel)]="kilometers"
        placeholder="0"
      />
    </section>
  </fieldset>
  <input value="Convert" type="button" (click)="convert()" />
</form>
<section>
  <h4>{{ miles | number:'1.2-2' }} miles</h4>
</section>
<a [routerLink]="['dynamic']">Go to Abstract Dynamic Converter Sample</a>
```

---

# 2. Inversión del control

## Clase abstracta para dependencias

## Implementaciones

## Provisión manual

## Factoría

---

## 2.1 Clase abstracta para dependencias

```console
ng g s converter/dynamic-converter/abstract-culture
ng g c converter/dynamic-converter
```

```typescript
// converter-routing , reviwe SPA direct routing
const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: 'dynamic', component: DynamicConverterComponent },
];
```

```typescript
export class AbstractCultureService {
  sourceCulture: string;
  targetCulture: string;
  convertDistance: (source: number) => number;

  constructor() {}
}
```

---

### Consumo
```html
<h2> Dynamic Culture Converter. </h2>
<h3> From {{ source }} to {{ target }} </h3>
<form>
  <fieldset>
    <section>
      <label for="sourceDistance">Distance</label>
      <input name="sourceDistance"
             type="number"
             [(ngModel)]="sourceDistance"
             placeholder="0" />
    </section>
  </fieldset>
  <input value="Convert"
         type="button"
         (click)="convert()">
</form>
<section>
  <h4>Distance {{ targetDistance | number:'1.2-2' }} </h4>
</section>
```

---

```typeScript
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
```

---

## 2.2 Implementaciones

```typescript
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private milesPerKilometer = 0.62137;
  private kilometersPerMile = 1.609;

  constructor() {}

  fromKilometersToMiles = (kilometers: number): number => kilometers * this.milesPerKilometer;
  fromMilesToKilometers = (miles: number): number => miles * this.kilometersPerMile;
}
```

---

### Concrete services

```console
ng g s converter/dynamic-converter/european
ng g s converter/dynamic-converter/american

```

---

## Extiende la clase abstracta pasando a kilómetros

```typescript
@Injectable()
export class EuropeanService extends AbstractCultureService {
  sourceCulture = 'USA';
  targetCulture = 'Europe';
  constructor(private calculatorService: CalculatorService) { super(); }
  public convertDistance = this.calculatorService.fromMilesToKilometers;
}
```

---

## Extiende la clase abstracta pasando a millas

```typescript
@Injectable()
export class AmericanService extends AbstractCultureService {
  sourceCulture = 'Europe';
  targetCulture = 'USA';
  constructor(private calculatorService: CalculatorService) { super(); }
  public convertDistance = this.calculatorService.fromKilometersToMiles;
}
```

---

## 2.3 Provisión manual

```typescript
{
 providers: [
    {
      provide: AbstractCultureService,
      useClass: AmericanService,
    },
  ],
}
```

---

## 2.4 Factoría

```typescript
const cultureFactory = (calculatorService: CalculatorService) => {
  if (environment.unitsCulture === 'metric') {
    return new EuropeanService(calculatorService);
  } else {
    return new AmericanService(calculatorService);
  }
};
```

```typescript
export const environment = {
  production: false,
  unitsCulture: 'metric'
};
```

---

La provisión del servicio apunta a la función factoría. Si además el servicio dependiese de otro tenemos que especificarlo en el sub-array `deps:[]`.

```typescript
{
  providers: [
    {
      provide: AbstractCultureService,
      useFactory: cultureFactory,
      deps: [CalculatorService]
    }
  ]
}
```

---

# Demostración en clase

> Servicio inyectable para mantener en memoria el listado de movimientos. CRUD y filtros básicos de búsqueda.

- [ ] Servicio Injectable
- [ ] Dependencia en los componentes

---
> Next:

# [Comunicaciones http en Angular](https://academiabinaria.github.io/angular-basic/readme/6-http.html)

## El cliente http

## Operaciones con observables

## Interceptores de llamadas

> **Blog de apoyo:** [Servicios inyectables en Angular](https://academia-binaria.com/servicios-inyectables-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
