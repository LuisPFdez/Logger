import { LoggerError } from "./Error";
import { ColoresLogger } from "./ColoresLogger";
import { formato_defecto, formato_error_defecto, Logger, NIVEL_LOG } from "../index";
import { Funcion_comprobar, Funcion_insertar, LoggerDB_Config, LoggerDB_ConfigE, } from "./LoggerConfig";

// Funciones por defecto
/** Funcion vacia, para comprobar la conexion por defecto, siempre devuelve true */
export const funcion_comprobar_defecto = async () => true;
/** Funcion vacia, para insertar el log por defecto */
export const funcion_insertar_defecto = async () => { return };

/**
 * Clase que permite
 * @typeParam T, Tipo de la configuración para la conexion
 * @extends Logger
 */
export class Logger_DB<T> extends Logger {

    protected _config_conexion: T = <T>{};
    protected _funcion_comprobar_conexion: Funcion_comprobar<T>;
    protected _funcion_insertar_log: Funcion_insertar<T>;

    /**
     * @typeParam T, Tipo de la configuración para la conexion
     * @param config_conexion T, configuracion para la acceder a la base de datos, por defecto un objeto vacio
     * @param funcion_insertar_log Funcion_insertar<T>, funcion para insertar el log en la base de datos
     * @param funcion_comprobar_conexion Funcion_comprobar<T>, funcion para comprobar el acceso a la base de datos. Por defecto una funcion vacio que siempre devuelve true
     * @param fichero string, nombre, del fichero, por defecto logger.log
     * @param ruta lugar donde se guarda el archivo, por defecto es el directorio raiz
     * @param nivel, NIVEL_LOG, nivel del log permitido para mostrarse, por defecto todos
     * @param formato string, formato normal, tiene un valor por defecto
     * @param formato_error string, formato para cuando se lanza un error, tiene un valor por defecto
     * @param config_conexion T, configuracion para la acceder a la base de datos, por defecto un objeto vacio
     * @param funcion_comprobar_conexion Funcion_comprobar<T>, funcion para comprobar el acceso a la base de datos. Por defecto una funcion vacio que siempre devuelve true
     * @param funcion_insertar_log Funcion_insertar<T>, funcion para insertar el log en la base de datos
     */
    constructor(config_conexion: T = <T>{}, funcion_insertar_log: Funcion_insertar<T> = funcion_insertar_defecto, funcion_comprobar_conexion: Funcion_comprobar<T> = funcion_comprobar_defecto,
        fichero: string = "logger.log", ruta: string = "./", nivel: NIVEL_LOG = NIVEL_LOG.TODOS, formato: string = formato_defecto, formato_error: string = formato_error_defecto) {
        //Pasa los parametros comunes con la clase padre a esta.
        super(fichero, ruta, nivel, formato, formato_error);
        //Parametros propios de la clase
        this._config_conexion = config_conexion;
        this._funcion_insertar_log = funcion_insertar_log;
        this._funcion_comprobar_conexion = funcion_comprobar_conexion;
        //Aunque la propieda de regex es comun, el constructor de Logger no lo acepta por parametro
        this._exp_logger = new RegExp("");
    }

    /**
     * Crea una Instancia de Logger_DB, comprobando antes si conecta a la base de datos. Mediante la funcion comprobar_conexion
     * @typeParam T, Tipo de la configuración para la conexion
     * @param config_conexion T, configuracion para la acceder a la base de datos, por defecto un objeto vacio
     * @param funcion_insertar_log Funcion_insertar<T>, funcion para insertar el log en la base de datos, por defecto una funcion vacia
     * @param funcion_comprobar_conexion Funcion_comprobar<T>, funcion para comprobar el acceso a la base de datos. Por defecto una funcion vacio que siempre devuelve true
     * @param fichero string, nombre, del fichero, por defecto logger.log
     * @param ruta lugar donde se guarda el archivo, por defecto es el directorio raiz
     * @param nivel, NIVEL_LOG, nivel del log permitido para mostrarse, por defecto todos
     * @param formato string, formato normal, tiene un valor por defecto
     * @param formato_error string, formato para cuando se lanza un error, tiene un valor por defecto
     * @param config_conexion T, configuracion para la acceder a la base de datos, por defecto un objeto vacio
     * @param funcion_comprobar_conexion Funcion_comprobar<T>, funcion para comprobar el acceso a la base de datos. Por defecto una funcion vacio que siempre devuelve true
     * @param funcion_insertar_log Funcion_insertar<T>, funcion para insertar el log en la base de datos
     * @returns Logger_DB<T>, instancia de la clase. En caso de fallar la comprobacion lanza un error
     */
    static async InstanciarClase<T>(config_conexion: T = <T>{}, funcion_insertar_log: Funcion_insertar<T> = funcion_insertar_defecto, funcion_comprobar_conexion: Funcion_comprobar<T> = funcion_comprobar_defecto,
        fichero: string = "logger.log", ruta: string = "./", nivel: NIVEL_LOG = NIVEL_LOG.TODOS, formato: string = formato_defecto, formato_error: string = formato_error_defecto): Promise<Logger_DB<T>> {
        //Crea una instancia de la clase
        const logger = new Logger_DB<T>(config_conexion, funcion_insertar_log, funcion_comprobar_conexion, fichero, ruta, nivel, formato, formato_error);
        //Comprueba la conexion a la base de datos a traves de la funcion pasada
        await logger.comprobar_conexion(config_conexion, funcion_comprobar_conexion);
        //Devuelve la instancia de la clase
        return logger;
    }

    // Getter y Setter de las propiedades
    get config_conexion(): T {
        return this._config_conexion;
    }

    get funcion_comprobar_conexion(): Funcion_comprobar<T> {
        return this._funcion_comprobar_conexion;
    }

    set funcion_comprobar_conexion(funcion_comprobar_conexion: Funcion_comprobar<T>) {
        this._funcion_comprobar_conexion = funcion_comprobar_conexion;
    }

    get funcion_insertar_log(): Funcion_insertar<T> {
        return this._funcion_insertar_log;
    }

    set funcion_insertar_log(funcion_insertar_log: Funcion_insertar<T>) {
        this._funcion_insertar_log = funcion_insertar_log;
    }

    /**
     * Comprueba la configuracion que se le ha pasado. Ejecuta la funcion de comprobacion de la conexion 
     * y en caso de ser erronea lanza una excepcion
     * @typeParam T, Tipo de la configuración para la conexion
     * @param config T, configuracion para conectar a la base de datos.
     * @returns T, la configuración, en caso de conectarse correctamente. En caso de no conectarse lanza un error
     */
    protected async comprobar_conexion(config: T, conexion?: Funcion_comprobar<T>): Promise<T> {
        //Si conexion es undefined se le asgina el valor de funcion_comprobar_conexion
        conexion = conexion || this._funcion_comprobar_conexion;
        //Comprueba si se ejecuta la funcion
        if (!await conexion(config)) {
            //En caso de devolver false lanza un error
            throw new LoggerError("Fallo al conectar con la base de datos");
        }
        //Devuelve la
        return config;
    }

    /**
     * Establece una nueva configuración de la conexion.
     * @typeParam T, Tipo de la configuración para la conexion
     * @param config_conexion T, configuración para la conexion
     */
    async establecerConfigConexion(config_conexion: T): Promise<void> {
        //Comprueba si es posible establecer la conexion antes de cambiar el valor de la propiedad
        this._config_conexion = await this.comprobar_conexion(config_conexion);
    }

    /**
     * Apartir de un objeto de Configuracion, asigna y devuelve las respectivas configuraciones filtradas
     * @typeParam T, Tipo de la configuración para la conexion
     * @param config LoggerConfig, objeto de configuracion 
     * @param tipo boolean, determina si el formato es normal o de error.
     * @param colores Paleta de colores en caso de que config no lo tengo
     * @returns LoggerConfigE, objeto de configuracion con las configuraciones filtradas
     */
    protected async configuracion_Async(config: LoggerDB_Config<T>, tipo: boolean, colores: ColoresLogger): Promise<LoggerDB_ConfigE<T>> {
        //LLama al metodo de configuración de la clase padre, para las configuraciones compartidas con la clase padre. 
        const configuracion = super.configuracion(config, tipo, colores);
        //Devuelve el resultada del metodo de configuracion mas las opciones propias
        return {
            //Expande la configuracion del metodo de configuracion
            ...configuracion,
            //Comprueba si la configuración es valida de la conexion es valida
            config_conexion: config.config_conexion ? await this.comprobar_conexion(config.config_conexion) : this.config_conexion,
            //Asigna la funcion para insertar la conexion
            function_insertar: config.function_insertar || this.funcion_insertar_log
        };

    }

    /**
     * Guarda un mensaje de log en la base de datos
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param nivel, nivel necesario para registrar el log
     * @param tipo string, tipo del mensaje 
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion 
     * @param error E, cualquier tipo de error
     */
    protected async base_datos<E extends Error>(nivel: NIVEL_LOG, tipo: string, msg: string, config: LoggerDB_Config<T>, error: E): Promise<void> {
        //Copia el objeto para evitar modificarlo involuntariamente
        config = { ...config };

        //Comprueba si el nivel es mayor al nivel para registrar el log
        if (nivel < this._nivel) return; //Si el nivel es menor no registrara nada
        //Guarda en variables las propiedades del objeto devuelto por obtener_datos_stack
        const { archivo, linea, nombre_error, mensaje_error, funcion } = this.obtener_datos_stack(error);

        //Comprueba si error es instancia (directa) de Error
        //En caso de que el error, utilizado entre otras cosas para saber desde donde se llama al metodo, sea 
        //distinto de Error, valor por defecto
        const tipoE = this.comprobar_tipo_error(error);

        //Elimnia la propiedad de colores para evitar, que se establezcan y aparezcan en el archivo
        delete config.colores;
        //Elimina la propiedad de fichero del objeto de configuracion para evitar, en caso de tener algun valor, hacer
        //las comprobaciones de la configuracion
        delete config.fichero;

        //Filtra la configuracion, le pasa el parametro de config, que tipo de formato ha de ser
        //y la paleta de colores por defecto, al ser un archivo los colores son vacios
        const { colores, formato, function_insertar, config_conexion } = await this.configuracion_Async(config, tipoE, {
            FINC: "",
            ROJO: "",
            VERDE: "",
            AMARILLO: "",
            AZUL: ""
        });

        //Renderiza la plantilla pasandole los valores que han de ser sustituidos
        //Como devuelve una funcion, la convierte a string
        const plantilla = (formato.compilarPlantilla({
            tipo: tipo,
            mensaje: msg,
            linea: linea,
            nombre_error: nombre_error,
            mensaje_error: mensaje_error,
            archivo: archivo,
            Color: colores,
            funcion: funcion
        })).toString();

        //Ejecuta la funcion para realizar la carga del log
        function_insertar(plantilla, config_conexion);
    }

    /**
     * Guarda un mensaje de log en la base de datos del Tipo LOG
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion, los colores no deber ser definido o se mostraran sus codigo en los ficheros 
     * @param error E, error para mostrar en el log
     * @remarks 
     * El parametro error, se usa para obtener el lugar de llamada de la funcion, tambien puede usarse para
     * manejar un mensaje de error. Por defecto error es una instancia de la clase Error.
     */
    log_base_datos<E extends Error>(msg: string, config: LoggerDB_Config<T> = {}, error: E = <E>new Error()): void {
        this.base_datos(NIVEL_LOG.LOG, "LOG", msg, config, error);
    }

    /**
     * Guarda un mensaje de log en la base de datos del Tipo INFO
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion, los colores no deber ser definido o se mostraran sus codigo en los ficheros
     * @param error E, error para mostrar en el log
     * @remarks 
     * El parametro error, se usa para obtener el lugar de llamada de la funcion, tambien puede usarse para
     * manejar un mensaje de error. Por defecto error es una instancia de la clase Error.
     */
    info_base_datos<E extends Error>(msg: string, config: LoggerDB_Config<T> = {}, error: E = <E>new Error()): void {
        this.base_datos(NIVEL_LOG.INFO, "INFO", msg, config, error);
    }

    /**
     * Guarda un mensaje de log en la base de datos del Tipo AVISO
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion, los colores no deber ser definido o se mostraran sus codigo en los ficheros
     * @param error E, error para mostrar en el log
     * @remarks 
     * El parametro error, se usa para obtener el lugar de llamada de la funcion, tambien puede usarse para
     * manejar un mensaje de error. Por defecto error es una instancia de la clase Error.
     */
    aviso_base_datos<E extends Error>(msg: string, config: LoggerDB_Config<T> = {}, error: E = <E>new Error()): void {
        this.base_datos(NIVEL_LOG.AVISO, "AVISO", msg, config, error);
    }

    /**
     * Guarda un mensaje de log en la base de datos del Tipo ERROR 
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion, los colores no deber ser definido o se mostraran sus codigo en los ficheros
     * @param error E, error para mostrar en el log
     * @remarks 
     * El parametro error, se usa para obtener el lugar de llamada de la funcion, tambien puede usarse para
     * manejar un mensaje de error. Por defecto error es una instancia de la clase Error.
     */
    error_base_datos<E extends Error>(msg: string, config: LoggerDB_Config<T> = {}, error: E = <E>new Error()): void {
        this.base_datos(NIVEL_LOG.ERROR, "ERROR", msg, config, error);
    }

    /**
     * Guarda un mensaje de log en la base de datos del Tipo FATAL
     * @typeParam E - Tipo que desciende de error 
     * @typeParam T - Tipo de la configuración para la conexion
     * @param msg string, mensaje del log
     * @param config LoggerConfig, configuracion, los colores no deber ser definido o se mostraran sus codigo en los ficheros
     * @param error E, error para mostrar en el log
     * @remarks 
     * El parametro error, se usa para obtener el lugar de llamada de la funcion, tambien puede usarse para
     * manejar un mensaje de error. Por defecto error es una instancia de la clase Error.
     */
    fatal_base_datos<E extends Error>(msg: string, config: LoggerDB_Config<T> = {}, error: E = <E>new Error()): void {
        this.base_datos(NIVEL_LOG.FATAL, "FATAL", msg, config, error);
    }

}