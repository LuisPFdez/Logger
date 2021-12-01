# Logger
Librería para el manejo de logs en TypeScript y JavaScript

<img height="150" src="./Docs/Icono.png">

## Librería 
Las dependencias del paquete son únicamente de desarrollo y poder compilar los archivos Typescript

Es posible copiar el código fuente en el proyecto, sin embargo, es recomendable incluirla como una librería externa

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

Para importar la librería

```JS
// TypeScript/JavaScript 
import { Logger } from "logger";

// Node JS
const { Logger } = require("logger");
```

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
## Clase Logger

Clase principal, encargada de la los registros log.

### Constructor

El constructor recibe 5 parametros (todos son opcionales).

1. **fichero** <*string*>, nombre del fichero ( no ha de especificarse la ruta en el nombre, es omitida en caso de especificarse), por defecto *logger.log*. Si el fichero no existe, creará un nuevo archivo. En caso de que el archivo exista, comprobará la extensión por seguridad, solo escribirá sobre los archivos con extension log. El archivo ha de tener permisos de lectura y escritura.
2. **ruta** <*string*>, ruta donde se almacenará el fichero. Por defecto el directorio será *./*. Si la ruta no existe o no es un directorio lanzará una excepción.
3. **nivel** <*NIVEL_LOG*>, nivel de log minimo para el registro de logs.
4. **formato** <*string*>, formato normal del log.
5. **formato_error** <*string*>, formato para logs de errores.

TypeScript
``` TS
import { Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } from "logger";

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```

JavaScript (NodeJS)
``` JS
const {Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } = require("logger");

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```
### Cambiar parametros de la clase

Todos los parametros de la clase pueden ser modificados cuando se desee. Al establecer un nuevo valor este funcionará igual que al establecerlo en el constructor. Tambien es posible ver su actual valor.

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

log.log_archivo("Log en el archivo por defecto");

//Para visualizar las propiedades
console.log(log.fichero);
console.log(log.ruta);

//Para modificar una propiedad
log.fichero = "./archivo.log";
//Al modificar la ruta tambien cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

log.log_archivo("Log en el archivo por defecto");

//Para visualizar las propiedades
console.log(log.fichero);
console.log(log.ruta);

//Para modificar una propiedad
log.fichero = "./archivo.log";
//Al modificar la ruta tambien cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

### Logs
La clase logger ofrece dos formas de registrar los logs, mediante la consola o en un archivo. Estos a su vez ofrecen distintos tipos de logs, cada tipo tendra su [prioridad](#niveles-log).

Todos los metodos, independientemente del nivel y la forma de registrarlo, reciben 3 párametros. Siendo dos de ellos opcionales.

1. **msg** <*string*>, mensaje del log, es el único párametro obligatorio.
2. **config** <*LoggerConfig*>, configuración especifica para el log (fichero, formato y/o colores ). En caso de no querer modificar la configuración pero sea necesario pasar un tercer párametro, bastará con un objeto vacio (valor por defecto).  
3. **error** <*Error*>, excepcion de la que se obtiene datos del error. En caso de no recibir ninguna, su valor por defecto, será una instancia de la clase Error (permite obtener ciertos datos como el fichero, el metodo o la linea desde donde se ha llamado ).

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

log.log_consola("Muestra log de consola 1");
log.info_consola("Muestra log de consola 2");
log.aviso_consola("Muestra log de consola 3");
log.error_consola("Muestra log de consola 4");
log.fatal_consola("Muestra log de consola 5");

log.log_archivo("Muestra log de archivo 1");
log.info_archivo("Muestra log de archivo 2");
log.aviso_archivo("Muestra log de archivo 3");
log.error_archivo("Muestra log de archivo 4");
log.fatal_archivo("Muestra log de archivo 5");
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

log.log_consola("Muestra log de consola 1");
log.info_consola("Muestra log de consola 2");
log.aviso_consola("Muestra log de consola 3");
log.error_consola("Muestra log de consola 4");
log.fatal_consola("Muestra log de consola 5");

log.log_archivo("Muestra log de archivo 1");
log.info_archivo("Muestra log de archivo 2");
log.aviso_archivo("Muestra log de archivo 3");
log.error_archivo("Muestra log de archivo 4");
log.fatal_archivo("Muestra log de archivo 5");
```

Formato error

TypeScript
```TS
import { Logger } from "Logger";

const log = new Logger();

try {
    log.log_consola("Log normal");

    //Tambien es posible instanciar un error y mostrara el formato error
    log.log_consola("Log error", {}, new Error("Excepcion"));

    //Se lanza una excepcion
    throw new SyntaxError("Excepcion");
} catch (e) {
    //Se le pasa la excepcion haciendo casting a la clase error
    log.log_consola("Log error", {}, <Error>e);
}
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

try {
    log.log_consola("Log normal");

    //Tambien es posible instanciar un error y mostrara el formato error
    log.log_consola("Log error", {}, new Error("Excepcion"));

    //Se lanza una excepcion
    throw new SyntaxError("Excepcion");
} catch (e) {
    //Se le pasa la excepcion haciendo casting a la clase error
    log.log_consola("Log error", {}, e);
}
```

### Formatos

La clase logger maneja dos formatos de logs. 
- **Formato Normal**, formato por defecto para los logs.
- **Formato Errores**, formato para los errores. Este formato es usado al pasarle una excepcion en la llamada para el log.

Las constantes **formato_defecto**  y **formato_error_defecto**, permiten acceder al valor por defecto que tienen los formatos.

``` TS
//Formato por defecto
export const formato_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}] - %{R}";
// Formato de error por defecto
export const formato_error_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}]( %{N} {%{F},%{L}} [%{E}] - {%{A}}) - %{R}";
```
Para crear un formato propio, existen ciertos parametros que podran sustituirse por su correspondiente valor. Todos estos parametros han de estar entre `%{}`, por ejemplo `%{T}`

| Parametro | Valor                                                             |
|:---------:|-------------------------------------------------------------------|
| **s**     | Muestra los segundos                                              |
| **i**     | Muestra los minutos                                               |
| **H**     | Muestra las hora                                                  |
| **D**     | Muestra el dia                                                    |
| **M**     | Muestra el mes                                                    |
| **Y**     | Muestra el año                                                    |
| **T**     | Muestra el tipo de log                                            |
| **F**     | Muestra el modulo donde se lanza el error o se llama al metodo    |
| **A**     | Muestra el archivo donde se lanza el error o se llama al metodo   |
| **R**     | Muestra el mensaje pasado al metodo                               |
| **L**     | Muestra la linea donde se lanza el error o se llama al metodo     |
| **N**     | Muestra el nombre del error                                       |
| **E**     | Muestra el mensaje del error                                      |
| **CR**    | Pinta de color rojo (Consola)                                     |
| **CA**    | Pinta de color azul (Consola)                                     |
| **CV**    | Pinta de color verde (Consola)                                    |
| **CM**    | Pinta de color amarillo (Consola)                                 |
| **CF**    | Marca el fin de coloreado                                         |

### LoggerConfig - Configuración de Log
Al registrar un log, es posible establecer una configuración específica para el log. La interfaz LoggerConfig (TypeScript), permite establecer las propiedades de un objeto de configuración (existe otro llamado LoggerConfigE, es posible que aparezca como una recomendación del IDE,similar pero sin las propiedades opcionales, su uso se limita al funcionamiento interno de la librería).  

LoggerConfig posee tres propiedades, todas opcionales:
- **colores** <*ColoresLogger*>, permite establecer una paleta de colores personalizada. No es posible modificar la paleta de los [log de archivo](#colores). 
- **fichero** <*string*>, permite establecer un fichero especifico para el log (la ruta será la misma que la de la clase). **Esta propiedad solo afecta a los log de archivo**
- **formato** <*string*>, permite establecer un formato especifico para el registro, independientemente de los formatos por defecto.

TypeScript
```TS
import { Logger, LoggerConfig } from "Logger";

const log = new Logger();

const config: LoggerConfig = {
    formato: "Nuevo Formato -> %{R}",
    fichero: "Archivo.log"
};

log.log_consola("Log normal", config);
log.log_archivo("Log normal", config);

//Tambien es posible instanciar un error y mostrara el formato error
log.log_consola("Log error", config, new Error("Excepcion"));
```

JavaScript
```JS
const { Logger } = require("logger");

const log = new Logger();

const config = {
    formato: "Nuevo Formato -> %{R}",
    fichero: "Archivo.log"
};

log.log_consola("Log normal", config);
log.log_archivo("Log normal", config);

//Tambien es posible instanciar un error y mostrara el formato error
log.log_consola("Log error", config, new Error("Excepcion"));
```

#### Colores
Es posible establecer colores, en los formatos, estos unicamente se muestran por consola, en un archivo se mostraría el código del color. Sin embargo la aplicación permite cambiar la paleta de colores en las llamadas a los logs, como un objeto dentro del objeto de [configuración de los log](#loggerconfig-configuración-de-log).

Como los códigos de colores se verían en los archivos, pudiendo quedar algo como, por ejemplo, '\x1b[31mRojo\x1b[0m', los colores estan inavilitados para los log de tipo archivo. Aunque se pase en la configuración, en el formato los parámetros de los colores se sustityen por "".

Para TypeScript existe una interfaz que facilita la creación de un objeto de colores, ColoresLogger. La interfaz especifica 5 colores:
- **AMARILLO** <*string*>, color amarillo, su valor se sustituye por el parametro **CM** en el formato.
- **AZUL** <*string*>, color azul, su valor se sustituye por el parametro **CA** en el formato.
- **ROJO** <*string*>, color rojo, su valor se sustituye por el parametro **CR** en el formato.
- **VERDE** <*string*>, color verde, su valor se sustituye por el parametro **CV** en el formato.
- **FINC** <*string*>, indica el fin del coloreado, su valor se sustituye por el parametro **CF** en el formato.

Cada color, no ha de corresponder necesariamente con el nombre de la propiedad, esto permite intercambiar colores sin necesidad de cambiar el formato. 

El objeto **Colores** permite acceder a los valores por defecto

| Color         | Valor            |
|:-------------:|:----------------:|
| *FINC*        | **\x1b[0m**      |
| *ROJO*        | **\x1b[31m**     |
| *VERDE*       | **\x1b[32m**     |
| *AMARILLO*    | **\x1b[33m**     |
| *AZUL*        | **\x1b[34m**     |

```TS
import { Colores, ColoresLogger, Logger, LoggerConfig } from "Logger";

const log = new Logger();

const colores: ColoresLogger = {
    AMARILLO: Colores.AMARILLO,
    AZUL: "\x1b[36m",
    ROJO: Colores.ROJO,
    VERDE: Colores.VERDE,
    FINC: Colores.FINC
}

const config: LoggerConfig = {
    formato: "%{CA}%{R}%{CF}",
    colores: colores
};

log.log_consola("Texto Cian", config);
config.colores = Colores;
log.log_archivo("Texto Azul", config);
```

```JS
const { Logger, Colores } = require("logger");

const log = new Logger();

const colores = {
    AMARILLO: Colores.AMARILLO,
    AZUL: "\x1b[36m",
    ROJO: Colores.ROJO,
    VERDE: Colores.VERDE,
    FINC: Colores.FINC
}

const config = {
    formato: "%{CA}%{R}%{CF}",
    colores: colores
};

log.log_consola("Texto Cian", config);
config.colores = Colores;
log.log_consola("Texto Azul", config);
```

### NIVELES LOG
La libreria permite establecer un nivel minimo para mostrar los distintos tipos de registro.

Al establecer un nivel, todos aquellos niveles inferiores no se mostrarán. Para establecer un nivel, el enum **NIVEL_LOG**, permite establecer el nivel minimo (cada nivel tiene asignado un valor numerico), también es posible establecer el nivel mediante números. 

| Nivel     | Valor  |
|:---------:|:------:|
| *TODOS*   | **0**  |
| *LOG*     | **1**  |
| *INFO*    | **2**  |
| *AVISO*   | **3**  |
| *ERROR*   | **4**  |
| *FATAL*   | **5**  |
| *NINGUNO* | **6**  |

TypeScript
```TS
import { Logger, NIVEL_LOG } from "logger";

const log = new Logger();

log.nivel = NIVEL_LOG.ERROR;
// Es posible tambien usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```

JavaScript (NodeJS)
```JS
const {Logger, NIVEL_LOG } = require("logger");

const log = new Logger();

log.nivel = NIVEL_LOG.ERROR;
// Es posible tambien usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```