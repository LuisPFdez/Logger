# Logger
Librería para el manejo de logs en TypeScript y JavaScript

<img height="150" src="./Docs/Icono.png">

## Librería 
Las dependencias del paquete son únicamente de desarrollo y poder compilar los archivos TypeScript

Es posible copiar el código fuente en el proyecto, sin embargo, es recomendable incluirla como una librería externa

### Copiar Librería
Si se copian los archivos fuente o compilados, bastará con importarlos desde el archivo que lo necesite

```TS
// TypeScript/JavaScript 
import { Logger } from "./index";

// Node JS
const { Logger } = require("./index");
```

### NPM
Para usar la librería tanto con JavaScript como con TypeScript es necesario [compilar a JavaScript](#compilar-a-javascript)

Con `npm link` es posible incluir, como una dependencia, librarías externas que no se encuentren dentro del propio gestor.

Dentro de la carpeta donde se ha clonado el repositorio, ejecuta npm link. Esto creará un link simbólico en la carpeta global de npm (solo es necesario hacerlo una vez)

Luego, dentro de las carpetas donde se quiere usar, ejecuta npm link nombre_paquete. El nombre del paquete viene dado por *name*, dentro del package.json en este caso **logger**

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

```TS
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
2. La segunda es similar a la primera (es necesario en el mismo directorio que *tsconfig.json*, o de lo contrario, dará error).
```BASH
npx tsc
```
3. La última, similar a las anteriores, pero ejecuta antes una comprobación del código (útil si se ha modificado el código).
```BASH
npm run build 
```

**Al finalizar, se habrá generado una carpeta *dist*, la cual contendrá los archivos de JavaScript y los archivos de declaración de TypeScript**

#### Archivos de declaración (TypeScript)
Proporcionan información a TypeScript sobre una API escrita en JavaScript. Permitiendo usar la API en TypeScript. 

Estos archivos tienen una extensión **.d.ts** y son necesarios únicamente para TypeScript. Permiten a TypeScript asignar características del lenguaje, que no están presentes en JavaScript.

Estos archivos no influyen para nada en el código JavaScript. Sin embargo, en caso de querer evitar que se incluyan en la compilación, es necesario modificar la propiedad **declaration** del archivo de [configuración del compilador](./tsconfig.json).
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

El constructor recibe 5 parámetros (todos son opcionales).

1. **fichero** <*string*>, nombre del fichero (no ha de especificarse la ruta en el nombre, es omitida en caso de especificarse), por defecto *logger.log*. Si el fichero no existe, creará un nuevo archivo. En caso de que el archivo exista, comprobará la extensión por seguridad, solo escribirá sobre los archivos con extensión log. El archivo ha de tener permisos de lectura y escritura.
2. **ruta** <*string*>, ruta donde se almacenará el fichero. Por defecto el directorio será *./*. Si la ruta no existe o no es un directorio lanzará una excepción.
3. **nivel** <*NIVEL_LOG*>, nivel de log mínimo para el registro de logs.
4. **formato** <*string*>, formato normal del log.
5. **formato_error** <*string*>, formato para logs de errores.

TypeScript
``` TS
import { Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } from "logger";

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```

JavaScript ( NodeJS ) 
``` JS
const {Logger, NIVEL_LOG, formato_defecto, formato_error_defecto } = require("logger");

const log = new Logger("Archivo_Log.log", "ruta/archivo", NIVEL_LOG.TODOS, formato_defecto, formato_error_defecto);
```
### Cambiar parámetros de la clase

Todos los parámetros de la clase pueden ser modificados cuando se desee. Al establecer un nuevo valor este funcionará igual que al establecerlo en el constructor. También es posible ver su actual valor.

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
//Al modificar la ruta también cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

JavaScript ( NodeJS ) 
```JS
const { Logger } = require("logger");

const log = new Logger();

log.log_archivo("Log en el archivo por defecto");

//Para visualizar las propiedades
console.log(log.fichero);
console.log(log.ruta);

//Para modificar una propiedad
log.fichero = "./archivo.log";
//Al modificar la ruta también cambiará la ruta del fichero
log.ruta = "./tmp";

log.log_archivo("Log en un archivo diferente");

console.log(log.fichero);
console.log(log.ruta);
```

### Logs
La clase logger ofrece dos formas de registrar los logs, mediante la consola o en un archivo. Estos a su vez ofrecen distintos tipos de logs, cada tipo tendrá su [prioridad](#niveles-log).

Todos los métodos, independientemente del nivel y la manera de registrarlo, reciben 3 parámetros. Siendo dos de ellos opcionales.

1. **msg** <*string | M*>, mensaje del log, es el único parámetro obligatorio. El tipo puede ser un string o cualquier tipo objeto que implemente el método *toString()*
2. **config** <*LoggerConfig*>, configuración especifica para el log (fichero, formato y/o colores). En caso de no querer modificar la configuración, pero sea necesario pasar un tercer parámetro, bastará con un objeto vacío (valor por defecto).  
3. **error** <*Error*>, excepción de la que se obtiene datos del error. En caso de no recibir ninguna, su valor por defecto, será una instancia de la clase Error (permite obtener ciertos datos como el fichero, el método o la línea desde donde se ha llamado).

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

JavaScript ( NodeJS ) 
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

    //También es posible instanciar un error y mostrará el formato error
    log.log_consola("Log error", {}, new Error("Excepcion"));

    //Se lanza una excepcion
    throw new SyntaxError("Excepcion");
} catch (e) {
    //Se le pasa la excepcion haciendo casting a la clase error
    log.log_consola("Log error", {}, <Error>e);
}
```

JavaScript ( NodeJS ) 
```JS
const { Logger } = require("logger");

const log = new Logger();

try {
    log.log_consola("Log normal");

    //También es posible instanciar un error y mostrará el formato error
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
- **Formato Errores**, formato para los errores. Este formato es usado al pasarle una excepción en la llamada para el log.

Las constantes **formato_defecto**  y **formato_error_defecto**, permiten acceder al valor por defecto que tienen los formatos.

``` TS
//Formato por defecto
export const formato_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}] - %{R}";
// Formato de error por defecto
export const formato_error_defecto = "(%{T})[%{D}-%{M}-%{Y}, %{H}:%{i}]( %{N} {%{F},%{L}} [%{E}] - {%{A}}) - %{R}";
```
Para crear un formato propio, existen ciertos parámetros que podrán sustituirse por su correspondiente valor. Todos estos parámetros han de estar entre `%{}`, por ejemplo `%{T}`

| Parámetro | Valor                                                             |
|:---------:|-------------------------------------------------------------------|
| **s**     | Muestra los segundos                                              |
| **i**     | Muestra los minutos                                               |
| **H**     | Muestra las horas                                                 |
| **D**     | Muestra el día                                                    |
| **M**     | Muestra el mes                                                    |
| **Y**     | Muestra el año                                                    |
| **T**     | Muestra el tipo de log                                            |
| **F**     | Muestra el módulo donde se lanza el error o se llama al método    |
| **A**     | Muestra el archivo donde se lanza el error o se llama al método   |
| **R**     | Muestra el mensaje pasado al método                               |
| **L**     | Muestra la línea donde se lanza el error o se llama al método     |
| **N**     | Muestra el nombre del error                                       |
| **E**     | Muestra el mensaje del error                                      |
| **CR**    | Pinta de color rojo (Consola)                                     |
| **CA**    | Pinta de color azul (Consola)                                     |
| **CV**    | Pinta de color verde (Consola)                                    |
| **CM**    | Pinta de color amarillo (Consola)                                 |
| **CF**    | Marca el fin de coloreado                                         |

### LoggerConfig - Configuración de Log
Al registrar un log, es posible establecer una configuración específica para el log. La interfaz LoggerConfig (TypeScript), permite establecer las propiedades de un objeto de configuración (existe otro llamado LoggerConfigE, es posible que aparezca como una recomendación del IDE, similar pero sin las propiedades opcionales, su uso se limita al funcionamiento interno de la librería).  

LoggerConfig posee tres propiedades, todas opcionales:
- **colores** <*ColoresLogger*>, permite establecer una paleta de colores personalizada. No es posible modificar la paleta de los [log de archivo](#colores). 
- **fichero** <*string*>, permite establecer un fichero específico para el log (la ruta será la misma que la de la clase). **Esta propiedad solo afecta a los log de archivo**
- **formato** <*string*>, permite establecer un formato específico para el registro, independientemente de los formatos por defecto.
- **codificacion** <*BufferEncoding*>. **Esta propiedad solo afecta a los log de archivo**. Establece la codificación con la que se escribirá el log en el archivo. Por defecto *UTF-8*

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

//El formato de config tendrá prioridad sobre el formato de error
log.log_consola("Log error", config, new Error("Excepcion"));
```

JavaScript ( NodeJS ) 
```JS
const { Logger } = require("logger");

const log = new Logger();

const config = {
    formato: "Nuevo Formato -> %{R}",
    fichero: "Archivo.log"
};

log.log_consola("Log normal", config);
log.log_archivo("Log normal", config);

//El formato de config tendrá prioridad sobre el formato de error
log.log_consola("Log error", config, new Error("Excepcion"));
```

#### Colores
Es posible establecer colores, en los formatos, estos únicamente se muestran por consola, en un archivo se mostraría el código del color. Sin embargo, la aplicación permite cambiar la paleta de colores en las llamadas a los logs, como un objeto dentro del objeto de [configuración de los log](#loggerconfig-configuración-de-log).

Como los códigos de colores se verían en los archivos, pudiendo quedar algo como, por ejemplo, '\x1b[31mRojo\x1b[0m', los colores están inhabilitados para los log de tipo archivo. Aunque se pase en la configuración, en el formato los parámetros de los colores se sustituyen por "".

Para TypeScript existe una interfaz que facilita la creación de un objeto de colores, ColoresLogger. La interfaz especifica 5 colores:
- **AMARILLO** <*string*>, color amarillo, su valor se sustituye por el parámetro **CM** en el formato.
- **AZUL** <*string*>, color azul, su valor se sustituye por el parámetro **CA** en el formato.
- **ROJO** <*string*>, color rojo, su valor se sustituye por el parámetro **CR** en el formato.
- **VERDE** <*string*>, color verde, su valor se sustituye por el parámetro **CV** en el formato.
- **FINC** <*string*>, indica el fin del coloreado, su valor se sustituye por el parámetro **CF** en el formato.

Cada color no ha de corresponder necesariamente con el nombre de la propiedad, esto permite intercambiar colores sin necesidad de cambiar el formato. 

El objeto **Colores** permite acceder a los valores por defecto

| Color         | Valor            |
|:-------------:|:----------------:|
| *FINC*        | **\x1b[0m**      |
| *ROJO*        | **\x1b[31m**     |
| *VERDE*       | **\x1b[32m**     |
| *AMARILLO*    | **\x1b[33m**     |
| *AZUL*        | **\x1b[34m**     |

TypeScript
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

JavaScript ( NodeJS ) 
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
La librería permite establecer un nivel mínimo para mostrar los distintos tipos de registro.

Al establecer un nivel, todos aquellos niveles inferiores no se mostrarán. Para establecer un nivel, el enum **NIVEL_LOG**, permite establecer el nivel mínimo (cada nivel tiene asignado un valor numérico), también es posible establecer el nivel mediante números. 

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
// Es posible también usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```

JavaScript ( NodeJS ) 
```JS
const {Logger, NIVEL_LOG } = require("logger");

const log = new Logger();

log.nivel = NIVEL_LOG.ERROR;
// Es posible también usar un valor numerico (NIVEL_LOG.ERROR es igual a 4)
log.nivel = 4;
```

## Clase Logger_DB

Clase que extiende a [Logger](#clase-logger). Permitiendo usar los métodos de Logger junto a los específicos de *Logger_DB*. 

*Logger_DB* establece métodos genéricos para guardar los registros en bases de datos a través de **callbacks**.

### Constructor Logger_DB
Logger_DB recibe tres parámetros. Todos son opcionales. 

1. **config_conexion** <*T*>, configuración para establecer la conexión. En TypeScript el tipo de este se establece con el tipo genérico. 
2. **funcion_insertar_log** <*Funcion_insertar&lt;T&gt;*>, función para insertar el log en la base de datos. Por defecto es una función vacía.
3. **funcion_comprobar_conexion** <*Funcion_comprobar&lt;T&gt;*>, permite comprobar la conexión. Se ejecuta al cambiar la configuración de conexión, si la función devuelve **false** (se supone que porque la conexión ha fallado), se lanza una excepción. La función por defecto devuelve siempre true. 

El constructor admite también los métodos de [Logger](#constructor). 

Para crear una instancia de la clase, no es posible usar el constructor. Logger_DB ofrece un método estático, que hace una comprobación de la conexión, mediante la función para verificar la conexión.

El método estático **InstanciarClase**, devuelve una instancia de clase. Es un método asíncrono

TypeScript
```TS
//El ejemplo utiliza una base de datos MySQL
import { Funcion_comprobar, Funcion_insertar, Logger_DB } from "logger";
import { ConnectionConfig, createConnection } from "mysql";

const config = {
    password: "contraseña",
    host: "localhost",
    database: "test",
    user: "USUARIO"
}

const comprobarconexion: Funcion_comprobar<ConnectionConfig> = async (config) => {
  //Devuelve una promesa, donde dentro se ejecutará la función para comprobar la conexión
  return new Promise(resolve => {
    //Crea la conexión con la base de datos
    const con = createConnection(config);
    //Inicia la conexión
    con.connect((err) => {
      //Destruye la conexión con la base de datos
      con.destroy();
      //En caso de error
      if (err) {
        console.log("Error al comprobar la conexión", err.message)
        //En caso de error, devuelve un resolve con false
        return resolve(false);
      }
      //En caso de no haber error, devuelve un resolve con false
      return resolve(true);
    });
  });
}

const insertarQuery: Funcion_insertar<ConnectionConfig> = async (quer, config) => {
    //Crea la conexión
    const con = createConnection(config);
    //Inicia la conexión con la base de datos
    con.connect();

    //Ejecuta la query para insertar el log
    con.query(`Insert into pruebas values ('${quer}')`, function (err, resultado) {
        if (err) {
            //En caso de error lo muestra por consola
            console.log("Error", err.message);
            return;
        }
        //En caso de una ejecucion correcta muestra un mensaje en la consola
        console.log("Consulta ejecutada con éxito:", resultado);
    });
    //Finaliza la conexión
    con.end();
}

//Función asíncrona main
async function main() {
    try {
        //Instancia la clase con el método genérico
        const log = await Logger_DB.InstanciarClase<ConnectionConfig>(config, insertarQuery, comprobarconexion);

        //Los niveles de log funciona. Su funcionamiento es igual que Logger-TS
        log.log_base_datos("Log en base de datos 1")
        log.info_base_datos("Log en base de datos 2");
        log.aviso_base_datos("Log en base de datos 3");
        log.error_base_datos("Log en base de datos 4");
        log.fatal_base_datos("Log en base de datos 5");
    } catch (e) {
        console.log("Error: ", <Error>e.name);
    };
}

main();
```

JavaScript ( NodeJS ) 
```JS
//El ejemplo utiliza una base de datos MySQL
const { Logger_DB } = require("logger");
const { createConnection } = require("mysql");

const config = {
    password: "contraseña",
    host: "localhost",
    database: "test",
    user: "USUARIO"
}

const comprobarconexion = async (config) => {
   //Devuelve una promesa, donde dentro se ejecutará la función para comprobar la conexión
  return new Promise(resolve => {
    //Crea la conexión con la base de datos
    const con = createConnection(config);
    //Inicia la conexión
    con.connect((err) => {
      //Destruye la conexión con la base de datos
      con.destroy();
      //En caso de error
      if (err) {
        console.log("Error al comprobar la conexión", err.message)
        //En caso de error, devuelve un resolve con false
        return resolve(false);
      }
      //En caso de no haber error, devuelve un resolve con false
      return resolve(true);
    });
  });
}

const insertarQuery = async (quer, config) => {
    //Crea la conexión
    const con = createConnection(config);
    //Inicia la conexión con la base de datos
    con.connect();

    //Ejecuta la query para insertar el log
    con.query(`Insert into pruebas values ('${quer}')`, function (err, resultado) {
        if (err) {
            //En caso de error lo muestra por consola
            console.log("Error", err.message);
            return;
        }
        //En caso de una ejecucion correcta muestra un mensaje en la consola
        console.log("Consulta ejecutada con éxito:", resultado);
    });
    //Finaliza la conexión
    con.end();
}

//Función asíncrona main
async function main() {
    try {
        //Instancia la clase con el método genérico
        const log = await Logger_DB.InstanciarClase(config, insertarQuery, comprobarconexion);

        //Los niveles de log funciona. Su funcionamiento es igual que Logger-TS
        log.log_base_datos("Log en base de datos 1")
        log.info_base_datos("Log en base de datos 2");
        log.aviso_base_datos("Log en base de datos 3");
        log.error_base_datos("Log en base de datos 4");
        log.fatal_base_datos("Log en base de datos 5");
    } catch (e) {
        console.log("Error: ", e.name);
    };
}

main();
```

### Tipo Genérico T
Permite establecer el tipo de la configuración para la conexión (en TypeScript). El tipo genérico determina el tipo de configuración de la conexión para la instancia.

TypeScript
```TS
const log = await Logger_DB.InstanciarClase<ConnectionConfig>(config, insertarQuery, comprobarconexion);
```

&lt;ConnectionConfig&gt; define el tipo de configuración de la instancia para acceder a la base de datos. En este caso, el tipo será la interfaz de configuración de mysql *ConnectionConfig*

### LoggerDB_Config&lt;T&gt;
Extiende de [Logger_Config](#loggerconfig-configuración-de-log). 
Permite declarar la configuración y funciones para la conexión de la base de datos.

LoggerDB_Config&lt;T&gt; posee tres propiedades, todas son opcionales:
- **config_conexion** <*T*>, permite sustituir la configuración para la conexión. 
- **funcion_insertar** <*Funcion_insertar&lt;T&gt;*>, permite cambiar la función para insertar en la base de datos.
- **funcion_comprobar** <*Funcion_comprobar&lt;T&gt;*>, permite cambiar la función para comprobar la conexión (La función se ejecuta al cambiar la función de insertar, en caso de solo cambiar función de comprobar esta no se utilizará).

### Funciones
#### Función insertar&lt;T&gt;
La función insertar se ejecuta al llamar a cualquiera de métodos para registrar en la base de datos, la función puede recibir hasta 3 parámetros:
- **log** <*string*>, mensaje para registrar en la base de datos *(El mensaje puede tener un tamaño mayor al que admite la base de datos, es conveniente una columna de gran tamaño o implementar un método para comprobarlo en la base de datos antes de ejecutarlo)*.
- **config** <*T*>, configuración para la base de datos, el tipo de este será igual a tipo genérico del objeto de Logger_DB
- **datos** <*datosLog*>, tipo de objeto con los datos sobre el registro (Estos datos se usan para sustituir por su parámetro correspondiente en el formato, el objeto permite trabajar con estos datos de forma más personal, por ejemplo insertarlos por separado en la base de datos). Los datos del objeto son: 
    - **tipo** <*string*>, tipo de log
    - **mensaje** <*string*>, mensaje pasado al método
    - **linea** <*string*>, línea donde se lanza el error o se llama al método
    - **nombre_error** <*string*>, nombre del error
    - **mensaje_error** <*string*>, mensaje del error
    - **archivo** <*string*>, archivo donde se lanza el error o se llama al método
    - **funcion** <*string*>, módulo donde se lanza el error o se llama al método
- **logger** <*Logger_DB&lt;T&gt;*>, instancia de *Logger_DB*. Permite hacer uso de sus métodos para distintos tipos de registros. 
Ejemplo de una función: 

TypeScript
```TS
//El ejemplo utiliza una base de datos MySQL
import { ConnectionConfig, createConnection } from "mysql";
import { datosLog, Logger_DB } from "logger";

//Función para insertar en la base de datos
async function insertar_base_datos(log: string, config: ConnectionConfig, datos: datosLog, logger: Logger_DB<ConnectionConfig>): Promise<void> {
    //Crea la conexión con la base de datos
    const con = createConnection(config);
    //Callback para la función query
    const queryCallback: Function = (err, resultado): void => {
        if (err) {
            //En caso de error utiliza el parámetro logger para registrar el log, (también es posible usar otro sistema como console.log())
            logger.log_consola("Error, fallo al insertar el log", {}, err);
        } else {
            //En caso de funcionar correctamente lo imprime por consola
            logger.log_consola(`Resultado ${resultado}`);
        }
    };

    //Inicia la conexión
    con.connect();

    //Suponiendo que la columna pruebas tenga un varchar(150), comprueba si log tiene una longitud superior a 150
    if (log.length > 150) {
        //Si la longitud del log excede los 150 caracteres cambia el tipo de log a uno más corto
        con.query(`Insert into pruebas values ('Error en el archivo: ${datos.archivo}, Mensaje error: ${datos.mensaje_error}')`, queryCallback);
    } else {
        //Si la longitud del log es menor a la máxima se inserta directamente el log
        con.query(`Insert into pruebas values ('${log}')`, queryCallback);
    }

    //Finaliza la conexión con la base de datos
    con.end();
}
```

JavaScript ( NodeJS )
```JS 
//El ejemplo utiliza una base de datos MySQL
const { createConnection } = require("mysql");

//Funcion para insertar en la base de datos
async function insertar_base_datos(log, config, datos, logger) {
    //Crea la conexión con la base de datos
    const con = createConnection(config);
    //Callback para la función query
    const queryCallback = (err, resultado) => {
        if (err) {
            //En caso de error utiliza el parámetro logger para registrar el log, (también es posible usar otro sistema como console.log())
            logger.log_consola("Error, fallo al insertar el log", {}, err);
        } else {
            //En caso de funcionar correctamente lo imprime por consola
            logger.log_consola(`Resultado ${resultado}`);
        }
    };

    //Inicia la conexión
    con.connect();

    //Suponiendo que la columna pruebas tenga un varchar(150), comprueba si log tiene una longitud superior a 150
    if (log.length > 150) {
        //Si la longitud del log excede los 150 caracteres cambia el tipo de log a uno más corto
        con.query(`Insert into pruebas values ('Error en el archivo: ${datos.archivo}, Mensaje error: ${datos.mensaje_error}')`, queryCallback);
    } else {
        //Si la longitud del log es menor a la máxima se inserta directamente el log
        con.query(`Insert into pruebas values ('${log}')`, queryCallback);
    }

    //Finaliza la conexión con la base de datos
    con.end();
}
```
#### Funcion comprobar&lt;T&gt;
La función comprobar se ejecuta al crear una instancia de la clase (con ` Logger_DB.InstanciarClase()`). También al cambiar la configuración de la conexión, mediante el objeto de configuración al ejecutar el registro o al cambiar la configuración de la instancia mediante el método `establecerConfigConexion()`. 

La función puede recibir hasta 3 parámetros:

- **config** <*T*>, configuración para la base de datos, el tipo de este será igual a tipo genérico del objeto de Logger_DB
- **logger** <*Logger_DB&lt;T&gt;*>, instancia de *Logger_DB*. Permite hacer uso de sus metodos para distintos tipos de registros. 
Ejemplo de una funcion: 

TypeScript
```TS
//El ejemplo utiliza una base de datos MySQL
import { ConnectionConfig, createConnection } from "mysql";
import { Logger_DB } from "logger";

async function comprobar_conexion(config: ConnectionConfig, logger: Logger_DB<ConnectionConfig>): Promise<boolean> {
  //Devuelve una promesa, donde dentro se ejecutará la función para comprobar la conexión
  return new Promise(resolve => {
    //Crea la conexión con la base de datos
    const con = createConnection(config);
    //Inicia la conexión
    con.connect((err) => {
      //Destruye la conexión con la base de datos
      con.destroy();
      //En caso de error
      if (err) {
        logger.log_consola("Error al comprobar la conexión", {}, err)
        //En caso de error, devuelve un resolve con false
        return resolve(false);
      }
      //En caso de no haber error, devuelve un resolve con false
      return resolve(true);
    });
  });
}
```

JavaScript ( NodeJS )
```JS
//El ejemplo utiliza una base de datos MySQL
const { createConnection } = require("mysql");

async function comprobar_conexion(config, logger) {
    //Devuelve una promesa, donde dentro se ejecutará la función para comprobar la conexión
    return new Promise(resolve => {
        //Crea la conexión con la base de datos
        const con = createConnection(config);
        //Inicia la conexión
        con.connect((err) => {
            //Destruye la conexión con la base de datos
            con.destroy();
            //En caso de error
            if (err) {
                console.log("Error al comprobar la conexión", err.message)
                logger.log_consola("Error al comprobar la conexión", {}, err)
                //En caso de error, devuelve un resolve con false
                return resolve(false);
            }
            //En caso de no haber error, devuelve un resolve con false
            return resolve(true);
        });
    });
}
```
## Tipo del mensaje ( tipo genérico M )
Desde la versión 1.3, no es necesario que el mensaje del log sea obligatoriamente un string. Cualquier tipo u objeto que tenga el método `toString()` declarado (incluso el tipo string también tiene un método `toString()`);

Esto es válido tanto para Logger (métodos de archivo y consola) como Logger_DB (método de base_datos). 

Todos los objetos o tipos que se pasen serán convertidos a *string*.
```TS
//Parte del código de la clase Logger (método protegido 'Archivo')
const plantilla = (formato.compilarPlantilla({
    tipo: tipo,
    mensaje: msg.toString(),
    linea: linea,
    nombre_error: nombre_error,
    mensaje_error: mensaje_error,
    archivo: archivo,
    Color: colores,
    funcion: funcion
})).toString();
```

Algunos objetos, aunque poseen la propiedad `toString()` puede no imprimir correctamente las propiedades, por ejemplo, los objetos de JavaScript al hacer el toString() imprimir[object Object]. 

TypeScript
```TS
import { Logger } from "logger";

class Objeto {

    propiedad1: string;
    propiedad2: string;

    constructor(propiedad1: string, propiedad2: string) {
        this.propiedad1 = propiedad1;
        this.propiedad2 = propiedad2;
    }

    toString(): string {
        return `Propiedad 1 -> ${this.propiedad1}, Propiedad 2 -> ${this.propiedad2}.`;
    }
}

//El método toString() de un objeto, por defecto, imprime [object Object]. 
//A continuación modifica el método para que el toString() funcione correctamente
//Al ser un método propio es posible modificar la salida de distintas formas
Object.prototype.toString = function (this: Record<string, any>): string {
    //El objeto resultado empezará por '{' del objeto
    let resultado = "{";
    //Obtiene todas las claves del objeto y las recorre
    Object.keys(this).forEach((elemento: string) => {
        //Contatena cada posición del objeto al resultado total. 
        //El ?. evita que si toString() no está declarado falle
        resultado = `${resultado} ${elemento} :: '${this[elemento].toString?.()}',`;
    });

    //Elimina la última coma y cierra la llave '}'
    resultado = `${resultado.slice(0, -1)} }`;
    //Devuelve el resultado
    return resultado;
};

const log = new Logger();
const obj = {
    propiedad1: "Valor 1",
    propiedad2: "Valor 2",
    propiedad3: [1, 2, 3, 4],
    propiedad4: {
        propiedad_anidada1: "Valor 1",
        propiedad_anidada2: "Valor 2",
    }

};

log.log_consola("Con un string sigue funcionando igual 😄");
//El método to string de un array simplemente mostrará los elementos separados por comas
log.log_consola([1, 2, 3, 4]);
//La salida del objeto será según el nuevo método
log.log_consola(obj);
//Otra forma es usar el método JSON.stringify que convierte el objeto a un string
log.log_consola(JSON.stringify(obj));
//La clase objeto sobreescribe el método toString()
log.log_consola(new Objeto("Valor 1", "Valor 2"));
//Incluso las funciones implementan un toString() y funciona al ser mostrado por consola
log.log_consola(log.log_archivo);
```

JavaScript ( NodeJS )
```JS
const { Logger } = require("logger");

class Objeto {

    propiedad1;
    propiedad2;

    constructor(propiedad1, propiedad2) {
        this.propiedad1 = propiedad1;
        this.propiedad2 = propiedad2;
    }

    toString() {
        return `Propiedad 1 -> ${this.propiedad1}, Propiedad 2 -> ${this.propiedad2}.`;
    }
}

//El método toString() de un objeto, por defecto, imprime [object Object]. 
//A continuación modifica el método para que el toString() funcione correctamente
//Al ser un método propio es posible modificar la salida de distintas formas
Object.prototype.toString = function () {
    //El objeto resultado empezará por '{' del objeto
    let resultado = "{";
    //Obtiene todas las claves del objeto y las recorre
    Object.keys(this).forEach((elemento) => {
        //Contatena cada posición del objeto al resultado total. 
        //El ?. evita que si toString() no está declarado falle
        resultado = `${resultado} ${elemento} :: '${this[elemento].toString?.()}',`;
    });

    //Elimina la última coma y cierra la llave '}'
    resultado = `${resultado.slice(0, -1)} }`;
    //Devuelve el resultado
    return resultado;
};

const log = new Logger();
const obj = {
    propiedad1: "Valor 1",
    propiedad2: "Valor 2",
    propiedad3: [1, 2, 3, 4],
    propiedad4: {
        propiedad_anidada1: "Valor 1",
        propiedad_anidada2: "Valor 2",
    }

};

log.log_consola("Con un string sigue funcionando igual 😄");
//El método to string de un array simplemente mostrará los elementos separados por comas
log.log_consola([1, 2, 3, 4]);
//La salida del objeto será según el nuevo método
log.log_consola(obj);
//Otra forma es usar el método JSON.stringify que convierte el objeto a un string
log.log_consola(JSON.stringify(obj));
//La clase objeto sobreescribe el método toString()
log.log_consola(new Objeto("Valor 1", "Valor 2"));
//Incluso las funciones implementan un toString() y funciona al ser mostrado por consola
log.log_consola(log.log_archivo);
```

## Extender Logger

Es posible añadir métodos propios extendiendo la clase *Logger*. Todos los métodos de *Logger*, son de tipo *protected* por lo que permite acceder a ellos desde las clases que la desciendan. 

La clase *Logger* contiene una propiedad llamada *_exp_logger*, esta propiedad permite conocer si un error ha sido lanzado desde alguno de los métodos de la clase.

Esto es útil principalmente para los formatos de los logs. 

Los errores permiten obtener información que no proporciona JavaScript con ningún otro método. Algunos metodos como `log_consola()` o similares permiten pasar un error como tercer parámetro opcional, si se pasa una instancia de algún error log se trata por defecto como un log de error. En caso de no pasar ningún error, sé instancia uno de la clase *Error*. 

La expresión regular permite diferenciar entre una instancia de la clase *Error* creada por defecto y una que ha sido pasada por parámetro.

``` TS
// El tercer parámetro será igual a new Error()
// Como es definido en el código ( TypeScript ) -> error: E = <E>new Error()
log.log_consola("Formato normal", {});

// Instancia del error, a pesar de ser igual que el parámetro por defecto mostrará un log de error
log.log_consola("Formato de error", {}, new Error());
```

*Logger* por defecto usa una expresión regular ajustada únicamente a los parámetros de *Logger* y *Logger_DB*. Aunque también ofrece una expresión por defecto que valida todos los métodos de las clases. 

```TS
// Los métodos de consola, archivo y base de datos son los únicos que instancian un error, a lo que se añade antes los tipos de log. 
export const exp_logger = /at Logger(_DB)?\.((log)|(info)|(aviso)|(error)|(fatal))_((consola)|(archivo)|(base_datos))/;

// Comprueba si el error proviene de cualquier método de una clase que empiece por Logger (por ejemplo Logger y Logger_DB validarían)
export const exp_logger_generico = /at Logger[0-9A-Z_$]*\.[$A-Z_][0-9A-Z_$]*/i;
```

Para establecer una expresión regular propia bastaría con incluirla en el constructor. 

Por ejemplo si *Logger_DB*, tuviera una expresión regular propia, seria: 
```TS
//Constructor de Logger_DB (es inaccesible desde fuera de la clase o una clase que la extienda) 
protected constructor(config_conexion: T = <T>{}, funcion_insertar_log: Funcion_insertar<T> = funcion_insertar_defecto, funcion_comprobar_conexion: Funcion_comprobar<T> = funcion_comprobar_defecto,
        fichero: string = "logger.log", ruta: string = "./", nivel: NIVEL_LOG = NIVEL_LOG.TODOS, formato: string = formato_defecto, formato_error: string = formato_error_defecto, codificacion: BufferEncoding = "utf-8") {
        //Pasa los parámetros comunes con la clase padre a esta.
        super(fichero, ruta, nivel, formato, formato_error, codificacion);
        //Parámetros propios de la clase
        this._config_conexion = config_conexion;
        this._funcion_insertar_log = funcion_insertar_log;
        this._funcion_comprobar_conexion = funcion_comprobar_conexion;
        //Esto modificará la expresión regular que está establecida por defecto
        this._exp_logger = new RegExp("Expresion regular");
    }
```