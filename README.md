# Logger
Librería para el manejo de logs en TypeScript y JavaScript

## Librería 
**Las dependencias del paquete son únicamente de desarrollo y poder compilar los archivos Typescript**

**Es posible copiar el código fuente en el proyecto, sin embargo, es recomendable incluirla como una librería externa**

### Copiar Librería
Si se copian los archivos fuente o compilados, bastará con la importarlos desde el archivo que lo necesite

```JS
// TypeScript/JavaScript 
import { Logger } from "./index";

// Node JS
const { Logger } = require("./index");
```

### NPM
Para usar la librería tanto con JavaScript como con TypeScript es necesario [compilar a JavaScript](#compilar-a-javaScript)

Con `npm link` es posible incluir, como una dependencia, librarías externas que no se encuentren dentro del propio gestor.

Dentro de la carpeta donde se ha clonado el repositorio, ejecuta npm link. Esto creara un link simbólico en la carpeta global de npm ( solo es necesario hacerlo una vez )

Luego, dentro de las carpetas donde se quiere usar, ejecuta npm link nombre_paquete. El nombre del paquete viene dado por *name*, dentro de el package.json en este caso **logger**

Es posible hacerlo todo en un paso, ejecutando npm link /ruta/relativa/o/absoluta. La ruta puede ser relativa o absoluta a la carpeta de la librería

```BASH
# Cambia a la carpeta home
cd ~
# Clona el repositorio
git clone https://github.com/LuisPFdez/Logger-TS

# ---Primera forma---
# Mueve a la carpeta
cd Logger-TS
# Ejecuta el primer comando
npm link
# Carpeta que necesitará la librería
cd ../otraCarpeta
# Ejecuta el segundo comando
npm link logger

# ---Otra forma más directa---
# Carpeta que necesitará la librería
cd ../otraCarpeta
# Ejecuta el segundo comando
npm link ../Logger-TS
```
**Si algún paquete dentro de *node_modules* comparte el mismo nombre, npm link, sobreescribirá el directorio. Para evitar basta con cambiar el valor de name, de package.json**

### Compilar a JavaScript
**Para compilar a JavaScript, dentro de la carpeta, es necesario tener antes las dependencias de desarrollo.** 

```BASH
# En caso de no tener las dependencias ejecuta
npm install
# O la forma abreviatura
npm i
```

Una vez instaladas las dependencias. Hay tres formas de hacerlo:
1. La primera y más recomendada.
```BASH
npm run build:ts
```
2. La segunda es similar a la primera (es necesario en el mismo directorio que *tsconfig.json*, o  de lo contrario, dará error).
```BASH
npx tsc
```
3. La ultima, similar a la anteriores pero ejecuta antes una comprobación del código (útil si se ha modificado el código).
```BASH
npm run build 
```

**Al finalizar, se habrá generado una carpeta *dist*, la cual contendrá los archivos de javascript y los archivos de declaración de TypeScript**

#### Archivos de declaración (TypeScript)
Proporcionan información a TypeScript sobre una API escrita en JavaScript. Permitiendo usar la API en TypeScript. 

Estos archivos tienen una extensión **.d.ts** y son necesarios unicamente para TypeScript. Permiten a TypeScript asignar características del lenguaje, que no están presentes en JavaScript.

Estos archivos no influyen para nada en el código JavaScrip. Sin embargo, en caso de querer evitar que se incluyan en la compilación, es necesario modificar la propiedad **declaration** del archivo de [configuración del compilador](./tsconfig.json).
```JSON
{
    "compilerOptions": {
        "declaration": false
    },
}
```