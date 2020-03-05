---
marp: true
---

# 1-Base

## Base para una aplicación Angular

---

# 1. Módulos

# 2. Componentes

# 3. Visibilidad entre componentes

# 4. Transitividad y Organización

---

# 1. Módulos

## Anatomía de un módulo

## Generación de módulos

---

## 1.1 Anatomía de un módulo

Un módulo es una clase decorada en **TypeScript**

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Árbol de módulos mediante el array de `imports:[]`

---

## 1.2 Generación de módulos

Usando el programa `ng` con el comando `generate` con la opción `module` y un nombre

```bash
ng g m layout
```

Resulta en el fichero `app/layout.module.ts`

```typescript
@NgModule({
  imports: [],
  declarations: []
})
export class LayoutModule {}
```

---

### Árbol de módulos mediante el array de `imports:[]`

Se agrega al array de importaciones en `AppModule`

```typescript
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LayoutModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
---

# 2. Componentes

## Anatomía de un componente

## Generación de componentes

---

## 2.1 Anatomía de un componente

- Un componente es una clase decorada en **TypeScript**
- Asociada a una plantilla **html**
- Con un selector **html**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'ab-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {}
```

---

### Para ser consumido

- Requiere un módulo donde declararse

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

- Y está listo para ser instanciado

```html
<body>
  <ab-root></ab-root>
</body>
```

---

## 1.2 Generación de componentes

Usando el programa `ng` con el comando `generate` con la opción `component`

```bash
ng g c layout/shell
ng g c layout/shell/header
ng g c layout/shell/main
ng g c layout/shell/footer
```

Resulta en ficheros como `core/shell.component.ts`

```typescript
@Component({
  selector: 'ab-shell',
  templateUrl: './shell.component.html',
  styles: []
})
export class ShellComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
```

---

### Composición de componentes

```html
<ab-header></ab-header>
<ab-main></ab-main>
<ab-footer></ab-footer>
```

---

# 3. Visibilidad entre componentes

## Componentes públicos y privados

## Importación y exportación entre módulos

---

## 3.1 Componentes públicos y privados

Los componentes inicialmente **sólo pueden usarse en su propio módulo**

> Para poder usar un componente fuera de su módulo necesito

### Exportar el componente

```typescript
@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [ShellComponent]
})
export class LayoutModule {}
```

> y algo más...

---

## 3.2 Importación y exportación entre módulos

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

y entonces `app.component.html` queda ridículamente simple:

```html
<ab-shell></ab-shell>
```

---

### La componentización implica mover contenido

- El contenido de `app.component.html` irá a _Header, Main y Footer_
- La propiedad `title` se moverá a `header.component.ts`

--

- ¿y qué pasa con `<router-outlet></router-outlet>`?

--

- Falla porque no es conocido en `LayoutModule`; hay que importarlo

```typescript
@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [ShellComponent]
})
export class LayoutModule {}
```

---

### 3.2.1 Dos mundos paralelos: imports de Angular e import de TypeScript

> En TypeScript cada fichero es un módulo

Para que algo sea visible desde fuera

#### Primero debe exportarlo

```typescript
export class AppComponent {}
```

#### Y luego importarlo

```typescript
import { AppComponent } from './app.component';
```

# 4. Transitividad y Organización

## Transitividad en una cadena de módulos

## Organización de la aplicación en módulos

---

## 4.1 Transitividad en una cadena de módulos

> Un módulo puede exportar sus componentes

> Pero también los de otros módulos relacionados

> Incluso un módulo completo

---

- Al mover contenido de `app.component.html` a los componentes de `CoreModule`.
- Para que funcionase hubo que importar el `RouterModule`, necesario para usar `<router-outlet>`.
> ¿Cómo es que **antes funcionaba**?

>> Por la **transitividad** usada en `AppRoutingModule`

---

### Imports - Exports

`AppRoutingModule` importa y exporta a `RouterModule`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

Luego el contenido `RouterModule` se podía usar directamente en `AppModule`

En `app.component.html`

```html
<main>Fork this <a
      href="https://github.com/AcademiaBinaria/angular-basic">Repository</a>
      <router-outlet></router-outlet>
</main>
```

---

## 4.2 Organización de la aplicación en módulos

- Los programas se organizan a partir de piezas menores.
- Los principios de **código limpio** nos permiten identificarlas y reutilizarlas.
- Los módulos y los componentes son piezas reutilizables


> Habrá piezas _funcionales_ y otras de _infraestructura_.

- Alguna será de uso único como el `LayoutModule`
- Y otras serán compartidas como el `SharedModule`

---

- Módulo `shared`
- Componente `GoHome`

```bash
ng g m shared
ng g c shared/go-home --export=true
```
`go-home.component.html`

```html
<a href=""> Go home 🏠</a>
```

---

```html
<main class="container ">
  <router-outlet></router-outlet>
  <ab-go-gome></ab-go-gome>
</main>
```

```typescript
@NgModule({
  declarations: [ShellComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [ShellComponent]
})
export class LayoutModule {}
```

---

### El bosque de módulos a vista de pájaro

```
AppModule
|
+--AppRoutingModule
|  |
|  +--RouterModule
|
+--BrowserModule
|
+--LayoutModule
   |
   +--CommonModule
   |
   +--RouterModule
   |
   +--SharedModule

```

---

### El bosque de componentes a vista de pájaro

```
AppComponent
|
+--ShellComponent
   |
   +--HeaderComponent
   |
   +--MainComponent
   |  |
   |  +--RouterOutletComponent
   |  |
   |  +--GoHomeComponent
   |
   +--FooterComponent

```

---

# Demostración en clase

> Mostrar módulos y componentes de infraestructura en `Angular-Budget`

---


# Práctica propuesta para alumnos

> Crear módulos de infraestructura en `Angular-Balance`

- [ ] Crear un módulo `layout`
- [ ] Crear componentes `shell`, `header`,`main`,`footer`
- [ ] Crear un módulo `shared`

---
> Next:

# [Páginas y rutas Angular SPA](https://academiabinaria.github.io/angular-basic/readme/2-spa.html)

## Rutas

## Lazy Loading

## Parámetros

## Rutas anidadas

> **Blog de apoyo:** [Base para una aplicación Angular](https://academia-binaria.com/base-aplicacion-angular/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
