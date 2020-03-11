# 4-Flow

## Flujo de datos entre componentes Angular

---

# 1. Comunicación entre componentes

# 2. El patrón Contenedor / Presentadores

# 3. Otras comunicaciones

---

# 1. Comunicación entre componentes

## Necesidad de comunicación

## Escenarios

---

## 1.1 Necesidad de comunicación

> Aplicaciones Complejas

- Principio de desarrollo _Divide y Vencerás_
- Múltiples páginas SPA

---

## 1.2 Escenarios

- Comunicar componentes **acoplados**
- Comunicar componentes entre **páginas distintas**
- Comunicar componentes entre **estructuras dinámicas**

---

# 2. Contenedor / Presentadores

## El patrón Contenedor / Presentadores

## El contenedor

## Envío hacia el presentador con @Input()

## Respuesta del presentador con @Output()

---

## 2.1 El patrón Contenedor / Presentadores

Es una elección de arquitectura que promueve:

### Reparto de responsabilidades:

  - **Contenedor**: gestión de datos
  - **Presentadores**: interacción con usuario

---

### Reutilización de presentadores

- **Librerías**: presentadores genéricos

---

### Contenedor y presentadores

```bash
ng g m car --route car --module app-routing.module
ng g c car/display_presenter
ng g c car/pedals_presenter
```

`src\app\layout\shell\main\main.component.html`
```html
<li><a routerLink="car">Flow</a></li>
```
---

## 2.2 Envío hacia el presentador con @Input()

Envío de información **desde el contenedor hacia el presentador**

Usa `[propiedad]="expresion"` en el contenedor

Y `@Input() propiedad` en el presentador

---

### Recepción en el controlador

```typescript
export class DisplayPresenterComponent implements OnInit {
  @Input() model: string;
  @Input() currentSpeed: number;
  @Input() topSpeed: number;
  @Input() units: string;
  constructor() {}
  ngOnInit() {}
  getSpeedClass = () =>
    this.currentSpeed < this.getThreshold() ? 'good' : 'warning';
  private getThreshold = () => this.topSpeed * 0.8;
}
```

---

### Presentación en la vista

```html
<h3> {{ model }} </h3>
<h4> Top speed: {{ topSpeed | number:'1.0-0' }}</h4>
<div>
  <div [ngClass]="getSpeedClass()">
    {{ currentSpeed | number:'1.2-2' }} {{ units }}
  </div>
  <progress [value]="currentSpeed"
            [max]="topSpeed">
  </progress>
</div>
```
---

```css
.good {
  background-color: green;
}
.warning {
  background-color: red;
}
```
---

`src\app\car\car.component.html`

```html
<ab-display-presenter model="tesla"
                      currentSpeed="60"
                      topSpeed="200"
                      units="km/h">
</ab-display-presenter>
```

---

## 2.3 @Output()

Envío de información **desde el presentador hacia el Contenedor**

Usa `(evento)="instruccion"` en el Contenedor

Y `@Output() evento = new EventEmitter<any>()` en el presentador

---

### Emisión desde el controlador

```typescript
export class PedalsPresenterComponent implements OnInit {
  @Input() brakeDisabled: boolean;
  @Input() throttleDisabled: boolean;
  @Output() brake = new EventEmitter<number>();
  @Output() throttle = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
```

---

### Suscripción desde la vista

```html
<h4>
  Pedals:
</h4>
<form>
  <input value="brake"
    class="secondary"
    type="button"
    [disabled]="brakeDisabled"
    (click)="brake.emit(1)"/>
  <input value="throttle"
    class="tertiary"
    type="button"
    [disabled]="throttleDisabled"
    (click)="throttle.emit(1)"/>
</form>
```
---

```html
<ab-pedals-presenter brakeDisabled="true"
                     throttleDisabled=""
                     (brake)="+1"
                     (throttle)="-1">
</ab-pedals-presenter>
```


---

## 2.4 El contenedor

### Container

```html
<ab-display-presenter [model]="car.name"
                      [currentSpeed]="car.currentSpeed"
                      [topSpeed]="car.maxSpeed"
                      [units]="'Km/h'">
</ab-display-presenter>
<ab-pedals-presenter (brake)="onBrake($event)"
                     [brakeDisabled]="disableBrake"
                     (throttle)="onThrottle($event)"
                     [throttleDisabled]="disableThrottle">
</ab-pedals-presenter>
```

---

### Manejo de datos

```typescript
car: CarModel;
disableBrake: boolean;
disableThrottle: boolean;

constructor() {}

ngOnInit() {
  this.car = { name: 'Roadster', maxSpeed: 120, currentSpeed: 0 };
  this.checkLimits();
}
private checkLimits() {
  this.disableBrake = false;
  this.disableThrottle = false;
  if (this.car.currentSpeed <= 0) {
    this.car.currentSpeed = 0;
    this.disableBrake = true;
  } else if (this.car.currentSpeed >= this.car.maxSpeed) {
    this.car.currentSpeed = this.car.maxSpeed;
    this.disableThrottle = true;
  }
}
```

---

### Lógica de negocios

```typescript
onBrake(drive: number) {
  this.car.currentSpeed -= this.getDelta(drive);
  this.checkLimits();
}

onThrottle(drive: number) {
  this.car.currentSpeed += this.getDelta(drive);
  this.checkLimits();
}

private getDelta = (drive: number) =>
  drive + (this.car.maxSpeed - this.car.currentSpeed) / 10
```

--_

```typescript
export interface CarModel {
  name: string;
  maxSpeed: number;
  currentSpeed: number;
}
```

---

# 3. Otras comunicaciones

## Comunicación entre distintas páginas

## Comunicación entre estructuras desacopladas

---

## 3.1 Comunicación entre distintas páginas

- A través del `RouterModule`

En `src\app\courses\courses-routing.module.ts`

```typescript
const routes: Routes =
[
  {
    path: ':slug',
    component: CoursesComponent
  }
];
```

En `home-component.html`

```html
<p>
  <a routerLink="courses/introduccion">💻 Introducción</a>
</p>
<p>
  <a routerLink="courses/avanzado">💻 Avanzado</a>
</p>
```

---

En `courses.component.ts`

```typescript
export class CoursesComponent implements OnInit {
  course: any;
  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => {
      const courseSlug = params.slug;
      this.course = environment.courses.find(c => c.slug === courseSlug);
    });
  }
  ngOnInit(): void {}
}
```
---

<!-- 🚧 W.I.P. 🚧 -->


## 3.2 Comunicación entre estructuras desacopladas

- Usando `Observables`

En el `ShellComponent`

```html
<header class="sticky">
  <a routerLink="/"> <span class="icon-home"></span>{{ title }}</a>
  <a routerLink="car"> <span class="icon-home"></span>Car</a>
  <a routerLink="contacts"> <span class="icon-home"></span>Contacts</a>
</header>
<main class="container ">
* <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```
Lo que pasa dentro de _main_ no se conoce en _header_...

---

> Recap:

# 3. Otras comunicaciones

## Comunicación entre distintas páginas

## Comunicación entre estructuras desacopladas

---

> Next:

# [Servicios inyectables en Angular](https://academiabinaria.github.io/angular-basic/readme/5-inject.html)

## Inyección de dependencias

## Inversión del control

> **Blog de apoyo:** [Flujo de datos entre componentes Angular](https://academia-binaria.com/flujo-de-datos-entre-componentes-angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
