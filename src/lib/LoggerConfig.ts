import { ColoresLogger } from "./ColoresLogger";

/** 
 *Interfaz que define todas las opciones de configuracion posibles, todas opcionales
*/
export interface LoggerConfig {
    fichero?: string;
    formato?: string;
    colores?: ColoresLogger;
    codificacion?: BufferEncoding;
}

/**
 * Interfaz que define los mismos parametros que LoggerConfig sin ser opcionales
 * @see {@link LoggerConfig}
 */
export interface LoggerConfigE {
    fichero: string;
    formato: string;
    colores: ColoresLogger;
    codificacion: BufferEncoding;
}

/**
 * Interfaz de configuración para Logger-DB
 * @extends LoggerConfig
 */
export interface LoggerDB_Config<T> extends LoggerConfig {
    config_conexion?: T;
    funcion_insertar?: Funcion_insertar<T>;
    funcion_comprobar?: Funcion_comprobar<T>;
}

/**
 * Interfaz de configuración para Logger-DB
 * @extends LoggerConfigE
 */
export interface LoggerDB_ConfigE<T> extends LoggerConfigE {
    config_conexion: T;
    funcion_insertar: Funcion_insertar<T>;
}

/** Tipo para las funciones de comprobacion de Logger*/
export type Funcion_comprobar<T> = (config: T) => Promise<boolean>;

/** Tipo para las funciones de insercion de Logger*/
export type Funcion_insertar<T> = (log: string, config: T, datos: datosLog) => Promise<void>;

/** Tipo de objeto con los datos sobre el registro  */
export type datosLog = {
    // [key: string]: unknown;
    tipo: string;
    mensaje: string;
    linea: string;
    nombre_error: string;
    mensaje_error: string;
    archivo: string;
    Color: ColoresLogger;
    funcion: string;
};