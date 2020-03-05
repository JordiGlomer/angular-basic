---
marp: true
---

# 0-hello

## [Hola Angular CLI](https://academia-binaria.com/hola-angular-cli/)

---

    # 1. Angular y el CLI

    # 2. Estructura de una aplicación Angular

    # 3. Configuración

    # 4. Angular y su ecosistema

---

# 1 Angular y el CLI

## Instalación de Angular CLI

## Crear y ejecutar aplicaciones Angular

---

## 1.1 Instalación de Angular CLI

> Angular es una plataforma de desarrollo dogmática y llave en mano.

--

Necesitarás un editor moderno como [VS Code](https://code.visualstudio.com/) y [NodeJS](https://nodejs.org/en/) con su manejador de de paquetes _npm_.

```console
node -v
```

--

Instrucciones para instalar angular cli.

```console
$ npm i -g @angular/cli@latest
$ ng version
$ ng help
$ ng new --help
```

---

## 1.2. Crear y ejecutar aplicaciones Angular

- Configuración que viene por defecto,

- Soluciones a medida.

> Para más información mira la documentación del comando [ng new](https://angular.io/cli/new).

---

### 1.2.1 Básica

```console
ng new unaAppMuyCorriente
cd unaAppMuyCorriente
npm start
```

--

### 1.2.2 Minimalista

```console
ng new minimalista -s -S -t
```

--

### 1.2.3 Profesional

```console
ng new profesional -p acme --routing true
```

---

### 1.2.4 Empresarial

```console
ng new empresarial --create-application false
cd empresarial
ng g application compras -p acme --routing true
```

### 1.2.5 Angular Basic

La aplicación que acompaña a este tutorial fue creada con este comando:

```console
ng new angular-basic -p ab --style css --routing
cd angular-basic
npm start
```

---

> Recap:

# 1 Angular y el CLI

## Instalación de Angular CLI

## Crear y ejecutar aplicaciones Angular

---

# 2. Estructura de una aplicación Angular

## Ficheros y carpetas principales

## Edición de un Hola Mundo

---

## 2.1 Ficheros y carpetas principales

- **angular.json** _: configuración del propio CLI. La madre de todos los configuradores_
- **package.json** _: dependencias de librerías y scripts_
- **src/** _: la carpeta donde están los archivos fuentes_
  - **index.html** _: un fichero HTML índice estándar_
  - **main.ts** _: fichero TypeScript de arranque de la aplicación_
  - **app/** _: la carpeta con el código específico de tu aplicación_
    - **app.module.ts** _: la aplicación es un árbol de módulos, y este es su raíz_
    - **app.component.ts** _: la página es un árbol de componentes, y este es su raíz_
    - **app.component.html** _: tiene una parte visual, esta es su vista_

---

## 2.2. Edición

### 2.2.1 `npm start`

1. `npm start`
2. `ng serve`
3. **webpack** server en http://localhost:4290
   1. vigilancia de cambios sobre la carpeta `src/`
   2. _live reload_
   3. compilado de la aplicación
   4. recarga del navegador

---

### 2.2.2 Edición de un Hola Mundo

**cambiar un fichero de código y comprobar el resultado** en el navegador.

1. Abre el fichero `app.component.ts`
2. Busca dentro de él una clase llamada `AppComponent`.
3. Asígnale el saludo de rigor: `title = 'angular-basic' + ' hello world'`
4. Guarda y comprueba que tu navegador **se actualiza automáticamente**.

---

> Recap:

# 2. Estructura de una aplicación Angular

## Ficheros y carpetas principales

## Edición de un Hola Mundo

---

# 3. Configuración

## Configurar el CLI

## Configurar el Workflow

## Configurar la aplicación

---

## 3.1 Angular.json

- Configuración Multi proyecto propia de angular.
- Rutas y configuraciones básicas para entornos de compilación y despliegue

## 3.2 Package.json

- Dependencias en ejecución y para desarrollo
- Scripts de ayuda

## 3.3 Environment

- Usadas en tiempo de ejecución
- Valores distintos por entorno

---

<!-- ### Ejemplo Angular.json

Instalación de un producto de terceros

```console
npm install mini.css --save
```

Configuración en `angular.json`

```json
{
    "styles": [
        "src/styles.css",
*       "./node_modules/mini.css/dist/mini-default.min.css"
    ]
}
```

--- -->

### Ejemplo Package.json

```json
{
   "scripts": {
    "ng": "ng",
    "start": "ng serve -o --port 4290",
    "start:prod": "npm run build:prod && npm run http-server",
    "build": "ng build",
    "build:prod": "ng build --prod",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
}
```

---

### Ejemplo Environments

```typescript
export const environment = {
  appName: 'Angular Basic',
  production: false
};
```

```typescript
title = environment.appName + 'hello world ;-)';
```

### Ejemplo Assets

```html
  <link rel="stylesheet" href="./assets/typography.css" />
```

---

### Ejecución en modo producción

```console
npm run start:prod
cd dist/angular-basic
http://localhost:4291/
```
---

> Recap:

# 3. Configuración

## Configurar el CLI

## Configurar el Workflow

## Configurar la aplicación

---

# 4. Angular y su ecosistema

## Extensiones de Visual Studio

## Configurar Prettier

## Ecosistema de terceros

---

## 4.1. Extensiones de Visual Studio

- [Extensiones Esenciales](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)

---

## 4.2 Configurar Prettier

### Prettier.config.js

npm install prettier -D
npm install tslint-config-prettier -D

```js
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve'
};
```

---

## 4.3 Ecosistema

- [Angular Material](https://material.angular.io/)
- [Bootstrap](https://ng-bootstrap.github.io/#/home)
- [Augury](https://augury.rangle.io/)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Ionic](https://ionicframework.com/)
- [Angular Console](https://angularconsole.com/)
- [Angular Next](https://next.angular.io/)

---

> Recap:

# 4. Angular, el CLI y su ecosistema

## Extensiones de Visual Studio

## Configurar Prettier

## Ecosistema de terceros
---

# Demostración en clase

Mostraremos cómo crear una aplicación con el CLI de Angular para gestión de proyectos y presupuestos llamada `Angular-Budget` .


### Extra

[angular-http-server](https://www.npmjs.com/package/angular-http-server)

```
npm install -g angular-http-server
```

[Deploy to GitHub pages](https://angular.io/guide/deployment#deploy-to-github-pages)

```
ng add angular-cli-ghpages
ng deploy --base-href=/angular-basic/
```

---

# Práctica propuesta para alumnos

> Crear una aplicación con el CLI de Angular llamada `Angular-Balance` que sea enrutable.

- [ ] Crear la aplicación con el CLI
- [ ] Modificar package.json (auto open port 4229)
- [ ] Extra: Usar angular-http-server (build)
- [ ] Extra: Publicar en GitHub Pages (build)

---

> Next:

# [Base para una aplicación Angular](https://academiabinaria.github.io/angular-basic/readme/1-base.html)

## Módulos

## Componentes

## Visibilidad entre componentes

## Transitividad y Organización

> **Blog de apoyo:** [Hola Angular CLI](https://academia-binaria.com/hola-angular-cli/)

> > By [Alberto Basalo](https://twitter.com/albertobasalo)
