# 2-SPA

## Páginas y rutas Angular SPA

---

# 1. Rutas

# 2. Lazy Loading

# 3. Rutas anidadas

# 4. Parámetros

---

# 1. Rutas

## RouterModule

## Router Outlet

## Router Link

---

## 1.1 RouterModule

`AppRoutingModule` importa, configura y exportar al `RouterModule`

```typescript
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

### Módulos y rutas

```bash
ng g m home --route=home -m app-routing.module.ts
ng g m not-found --route=not-found -m app-routing.module.ts
```

### home.component.html
```html
<h2> Welcome 🏡 !</h2>
<nav>
  <p>
    <a routerLink="courses/introduccion">💻 Introducción</a>
  </p>
  <p>
    <a routerLink="courses/avanzado">💻 Avanzado</a>
  </p>
</nav>
```

El componente `HomeComponent` se asocia con la ruta vacía `''`
El componente `NotFoundComponent` se asocia con la ruta `'not-found'`

--_

### RedirectTo

> Nadie va voluntariamente a esa ruta

>> Sólo los que se pierden

```typescript
{
  path: '**',
  redirectTo: 'not-found'
}
```

---

## 1.2 Router Outlet

El contenido de `main.component.ts`, ahora será dinámico

```html
<main>
  <p>
    Fork this <a href="https://github.com/AcademiaBinaria/angular-basic">Repository</a>
  </p>
  <router-outlet></router-outlet>
</main>
```

Por ejemplo el contenido de `NotFoundComponent` será

```html
<h3>404</h3>
<p> 🧭 not-found works!</p>
<ab-go-home></ab-go-home>
```

---

## 1.2 Router Link

En el `src\app\shared\go-home\go-home.component.html`

```html
<a routerLink=""> Go home 🏠</a>
```

> Es una _Directiva_
>>Como un atributo, pero con superpoderes

Por ahora, _simplemente_ mantiene la gestión de las rutas en el lado del navegador.

---

# 2 Lazy Loading

## Webpack y los bundles por ruta

## El enrutador delegado

## Navegación

---

## 2.1 Webpack y los bundles por ruta

- Objetivo: diferir la descarga de las rutas no visitadas

- Empaquetar cada ruta en un _bundle_

- Requiere un módulo por ruta

- Y un convenio especial con _webpack_

---

### Crear los componentes en módulos con enrutado

```bash
ng g m about --route=about -m app-routing.module.ts
 ```
Y se configuran las `rutas` con **'rutas al módulo'**

```typescript
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  }
```

---

## 2.2 El enrutador delegado

- `loadChildren` delega el enrutado en otro módulo; el `AboutRoutingModule`

> Ojo al path. En `AboutRoutingModule` sería:

```typescript
const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];
```

---

> Comprobar en ejecución

### Los bundles se descargan al navegar por las rutas


---

# 3. Rutas anidadas

## Children

## RouterOutlet anidado

---

## 3.1 Children

```bash
ng g c about/about/links
ng g c about/about/info
```

En `about-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: 'links',
        component: LinksComponent
      },
      {
        path: 'info',
        component: InfoComponent
      }
    ]
  }
];
```

---

## 3.2 RouterOutlet anidado

En `AboutComponent` :

```html
<h3>About us</h3>
<header>
  <p>
    <a routerLink="links"
       class="button"> Tutorial Links </a>
  </p>
  <p>
    <a routerLink="info"
       class="button"> More Info </a>
  </p>
</header>
<router-outlet></router-outlet>
```

---

# 4. Parámetros

## Variables en la ruta

## ActivatedRoute

---

## 4.1 Variables en la ruta

Dada esta estructura nuevos components

```bash
ng g m courses --route=courses -m app-routing.module.ts
```

---

Podemos gestionar dichas rutas en `app-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: ':slug',
    component: CoursesComponent
    }
];
```

Resuelve rutas como: _/courses/introduccion_ o _/courses/avanzado_

---

## 4.2 ActivatedRoute

Contenido del fichero `author.component.ts` relacionado con la obtención del parámetro de la ruta activa:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
export class CoursesComponent implements OnInit {
  course: any;
  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => {
      const courseSlug = params.slug;
      this.course = environment.courses.find(c => c.slug === courseSlug);
    });
  }
  ngOnInit() {}
}
```

Usamos la instancia `activateRoute` de la clase `ActivatedRoute` inyectada por el framework según veremos en el tema 5.

Para acceder a datos de la URL activa y mostrar los datos del curso en la vista

```html
<h3>👨‍🎓 {{ course.title }}</h3>
<p>{{course.description}}</p>
<p>
  <a href="{{course.url}}"
     target="_blank">{{course.url}}</a>
</p>
<p>
  <ab-go-home></ab-go-home>
</p>
```

---

Enlazamos todo agregando un par de entradas en `HomeComponent` :

```html
<h2> Welcome 🏡 !</h2>
<nav>
  <p>
    <a routerLink="courses/introduccion">💻 Introducción</a>
  </p>
  <p>
    <a routerLink="courses/avanzado">💻 Avanzado</a>
  </p>
</nav>
```

---

# Demostración en clase

> Mostrar módulos y rutas funcionales de infraestructura en `Angular-Budget`

---


# Práctica propuesta para alumnos

> Crear módulos de funcionales en `Angular-Balance`
> Empezar con las rutas básicas de la aplicación: `/`, `trasactions/new`, `trasactions/list`, `/transactions/:trasactionId`.

- [ ] Crear un módulo ruta home y asignarle la ruta vacía `''`
- [ ] Hacer lo mismo para el formulario de alta con la ruta `trasactions/new`
- [ ] Y ahora para la ruta que muestra la lista. Probar con y si la palabra _list_
- [ ] Por último una ruta paramétrica para mostrar una transacción concreta

---

> Next:

# [Formularios, tablas y modelos de datos en Angular](https://academiabinaria.github.io/angular-basic/readme/3-data.html)

## Formularios

## Estructuras y listados

## Modelo y controlador

> **Blog de apoyo:** [Páginas y rutas Angular SPA](https://academia-binaria.com/paginas-y-rutas-angular-spa/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
