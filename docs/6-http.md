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

`header.component.html`

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

> 🚧 Work in process...

## 1.3 Envío de datos


---

### Presentación en vista

---

## 1.4 Actualización de datos

### Refresco

---

### Borrado

---

# 2. Observables

## Async

## pipe

## operators

---

---

## 2.1 Async

### Tuberías de Angular |

```html
<h2> Currency Observable Rates. </h2>
<h3> From Euro to the $ world </h3>
<pre>{{ currentEuroRates$ | async | json }}</pre>
```

> Recibe un observable, se suscribe, y devuelve el dato cuando llegue.

---

En el controlador se exponen Observables

```typeScript
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates$: Observable<ExchangeRates> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url);
  }
```
> No es necesaria la suscripción en código

---

## 2.2 Pipe

### Tuberías en RxJS .pipe()

```typescript

```

---

## 2.3 Operators

```html
<pre>{{ ratesByDate$ | async | json }}</pre>
```
El consumo sigue igual... pero...

--

```typescript

```

---

# 3. Interceptores

## La interfaz HttpInterceptor

## Inversión del control vía token

## Un auditor de llamadas

---

```console
ng g s rates/AuditInterceptor
```

Hay que crear un servicio inyectable y hacerle cumplir una Interfaz

---

## 3.1 La interfaz HttpInterceptor

```typescript
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest }
  from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditInterceptorService implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler )
    : Observable<HttpEvent<any>> {
    // throw new Error( 'Method not implemented.' );
    return next.handle(req);
  }

  constructor() { }
}
```
---

## 3.2 Inversión del control vía token

> 1. Quitamos el `providedIn: 'root'`

> 2. Tomamos el control de la inyección

```TypeScript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuditInterceptorService,
    multi: true
  }
]
```

El `HttpClient` en su constructor reclama `HTTP_INTERCEPTORS`, un array de múltiples dependencias

Le damos nuestro interceptor para que lo agregue a su array

---

## 3.3 Un auditor de llamadas

```Typescript
export class AuditInterceptorService implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler){
    const started = Date.now();
    return next.handle(req)
     .pipe(
        filter((event: HttpEvent<any>) => event instanceof HttpResponse),
        tap((resp: HttpResponse<any>) => this.auditEvent(resp, started))
      );
  }

  private auditEvent(resp: HttpResponse<any>, started: number) {
    const elapsedMs = Date.now() - started;
    const eventMessage = resp.statusText + ' on ' + resp.url;
    const message = eventMessage + ' in ' + elapsedMs + 'ms';
    console.log(message);
  }
}
```

---

> Next:

# [Vigilancia y seguridad en Angular](https://academiabinaria.github.io/angular-basic/readme/7-watch.html)

## Uso de observables para monitorizar datos

## Uso de interceptores para gestionar errores

## Un notificador de problemas

> **Blog de apoyo:** [Comunicaciones Http en Angular](https://academia-binaria.com/comunicaciones-http-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
