# 6-http

## Comunicaciones http en Angular

---

# 1. El servicio HttpClient

# 2. Observables

# 3. Interceptores

---

# 1. El servicio HttpClient

## Importación y declaración de servicios

## Obtención de datos

## Envío de datos

## Actualización de datos

---

El módulo de comunicaciones

```console
ng g m money --route money --module app-routing.module
```

`main.component.html`

```html
<li><a routerLink="money">Http</a></li>
```

---

## 1.1 Importación y declaración de servicios

### Importación

```typescript
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MoneyComponent],
  imports: [HttpClientModule]
})
export class MoneyModule { }
```

---

### Dependencia

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-money',
  templateUrl: './money.component.html',
  styles: []
})
export class MoneyComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}
}
```

---

## 1.2 Obtención de datos

```typescript
export class MoneyComponent implements OnInit {
  private urlapi = 'https://api.exchangeratesapi.io/latest';
  currentEuroRates: any = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.urlapi}?symbols=${currencies}`;
    this.httpClient.get<any>(url).subscribe(apiResult => (this.currentEuroRates = apiResult));
  }
}
```

---

### Presentación en vista

```html
<h2> Currency Rates. </h2>
<h3> From Euro to the world </h3>
<pre>{{ currentEuroRates | json }}</pre>
```

---

> 🎪 Demo time

## 1.3 Envío de datos


---

### Presentación en vista

---

## 1.4 Actualización de datos

### Refresco

---

> Next:

# [Vigilancia y seguridad en Angular](https://academiabinaria.github.io/angular-basic/readme/7-watch.html)

## Uso de observables para monitorizar datos

## Uso de interceptores para gestionar errores

## Un notificador de problemas

> **Blog de apoyo:** [Comunicaciones Http en Angular](https://academia-binaria.com/comunicaciones-http-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
