# 7-watch

## Vigilancia y seguridad en Angular

---

# 1. Observables para presentar datos

# 2. Observables para gestionar datos

---

# 1. Observables para presentar datos

## Async

## pipe

---

## 1.1 Async

```console
ng g m rockets --route rockets --module app-routing.module
```

`main.component.html`

```html
<li><a routerLink="rockets">Watch</a></li>
```

### Tuberías de Angular |

En el controlador se exponen Observables

```typeScript
  private rocketsApi = 'https://launchlibrary.net/1.4/';
  public nextLaunches$: Observable<any> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getNextLaunches();
  }

  private getNextLaunches() {
    const url = this.rocketsApi + 'launch/next/5';
    this.nextLaunches$ = this.httpClient.get<any>(url);
  }
```
> No es necesaria la suscripción en código

---

```html
<h3> Next 5 rocket launches </h3>
<pre>{{ nextLaunches$ | async | json }}</pre>
```

> Recibe un observable, se suscribe, y devuelve el dato cuando llegue.


## 1.2 Pipe

### Tuberías en RxJS .pipe()


### El operador map

Transformaciones simples. De objeto a su internal array...

```typescript
private getNextLaunches() {
  const url = this.rocketsApi + 'launch/next/5';
  this.nextLaunches$ = this.httpClient.get<any>(url).pipe(
    map(apiData => apiData.launches)
  );
}
```

Seleccionar las propiedades de interés

```typescript
private getNextLaunches() {
  const url = this.rocketsApi + 'launch/next/5';
  this.nextLaunches$ = this.httpClient.get<any>(url).pipe(
    map(apiData => apiData.launches),
    map(launchesArray =>
      launchesArray.map(launch => ({
        name: launch.name,
        status: launch.status,
        scheduled: launch.net,
      }))
    )
  );
}
```

Cambiar datos o la forma de presentarlos
status	Integer (1 Green, 2 Red, 3 Success, 4 Failed)

```typescript
private getNextLaunches() {
  const url = this.rocketsApi + 'launch/next/5';
  this.nextLaunches$ = this.httpClient.get<any>(url).pipe(
    map(apiData => apiData.launches),
    map(launchesArray =>
      launchesArray.map(launch => ({
        name: launch.name,
        status: launch.status,
        scheduled: launch.net,
      }))
    ),
    map(customLaunches =>
      customLaunches.map(launch => ({
        ...launch,
        statusColor: launch.status === 1 ? 'green' : 'red',
      }))
    )
  );
}
```

---

```html
<ul *ngIf="nextLaunches$ | async as nextLaunches; else loading">
  <li *ngFor="let launch of nextLaunches"
      [style.color]="launch.statusColor">
    <b>{{ launch.name }}</b><i>{{ launch.scheduled }}</i>
  </li>
</ul>
<ng-template #loading>
  <i>Loading rocket data... </i>
</ng-template>
```


### El operador tap

Contar, auditar, cachear datos

```typescript
private getNextLaunches() {
  const url = this.rocketsApi + 'launch/next/5';
  this.nextLaunches$ = this.httpClient.get<any>(url).pipe(
    map(apiData => apiData.launches),
    map(launchesArray =>
      launchesArray.map(launch => ({
        name: launch.name,
        status: launch.status,
        scheduled: launch.net,
      }))
    ),
    map(customLaunches =>
      customLaunches.map(launch => ({
        ...launch,
        statusColor: launch.status === 1 ? 'green' : 'red',
      }))
    ),
    tap(rockets => console.log('num rockets:' + rockets.length)),
    tap(() => console.log('ha pasado algo')),
    map(()=>{
      const a =2;
    })
  );
}
```

Cualquier cosa que no los modifique

Un efecto secundario

---

# 2. Observables para monitorizar datos

## 2.1 Productores de observables

## 2.2 Un Store de notificaciones

## 2.3 Desacoplados pero conectados

---

## 2.1 Productores de observables

### Of y from

```typescript
value$ = of(new Date().getMilliseconds());
value$.subscribe(r=> console.log(r));

stream$ = from([1, 'two', '***']);
stream$.subscribe(r=> console.log(r));

list$ = of(['N', 'S', 'E', 'W']);
list$.subscribe(r=> console.log(r));
```

---

### Subject y BehaviorSubject

```typescript
const data = {name:'', value:0};

const need_sync$ = new Subject<any>();

// on time
need_sync.subscribe(r=> console.log(r));
need_sync.next(data);
// too late
need_sync.subscribe(r=> console.log(r));

const no_hurry$ = new BehaviorSubject<any>(this.data);
// its ok
no_hurry.subscribe(r=> console.log(r));
no_hurry.next(data);
// its also ok
no_hurry.subscribe(r=> console.log(r));
```

---

## 2.2 Un Store de notificaciones

```bash
ng g m rockets/nasa --route nasa --module rockets/rockets-routing.module
ng g c rockets/nasa/houston
ng g c rockets/nasa/florida
```

```html
<h3>NASA missions communication</h3>
<ab-houston></ab-houston>
<ab-florida></ab-florida>
```

```typescript
export class MissionsComunicationService {
  private messages: object[] = [{ icon: '👩‍🚀', subject: 'Crew on board' }];
  private messages$ = new BehaviorSubject<any[]>(this.messages);

  constructor() {}

  public getMessages$ = () => this.messages$.asObservable();

  public sendMessage = (message: object) => {
    this.messages.push(message);
    this.messages$.next(this.messages);
  };
}
```

---

## 2.3 Desacoplados pero conectados

### Emisión

Dependencia y uso del servicio del almacén para emisión de notificaciones

```html
<h4>Houston mission control</h4>
<p><button> Start count down 🏁</button></p>
<p><button> Ignition 🔥</button></p>
<p><button> Abort 🛑</button></p>
```

```typescript
export class HoustonComponent implements OnInit {
  constructor(private missionsComunicationService: MissionsComunicationService) {}

  ngOnInit(): void {}

  onStartClick() {
    this.missionsComunicationService.sendMessage({ icon: '🏁', subject: 'Start count down' });
  }
  onIgnitionClick() {
    this.missionsComunicationService.sendMessage({ icon: '🔥', subject: 'Ignition' });
  }
  onAbortClick() {
    this.missionsComunicationService.sendMessage({ icon: '🛑', subject: 'Abort' });
  }
}
```

---

### Recepción

Recepción de cambios, no importa el orden de subscripción

```typescript
export class FloridaComponent implements OnInit {
  messages$: Observable<any>;

  constructor(private missionsComunicationService: MissionsComunicationService) {}

  ngOnInit(): void {
    this.messages$ = this.missionsComunicationService.getMessages$();
  }
}
```

```html
<h4>Florida launch pad</h4>
<p>📋 Mission log</p>
<ul>
  <li *ngFor="let message of messages$ | async">{{ message }}</li>
</ul>
```

---

> Next:

# [Curso avanzado de Angular](https://academia-binaria.com/cursos/angular-business)

> **Blog de apoyo:** [Vigilancia y seguridad en Angular](https://academia-binaria.com/vigilancia-y-seguridad-en-Angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
