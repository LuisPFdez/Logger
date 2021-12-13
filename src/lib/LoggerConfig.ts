import { ColoresLogger } from "./ColoresLogger";

/** 
 *Interfaz que define todas las opciones de configuracion posibles, todas opcionales
*/
export interface LoggerConfig {
    fichero?: string;
    formato?: string;
    colores?: ColoresLogger;
}

/**
 * Interfaz que define los mismos parametros que LoggerConfig sin ser opcionales
 * @see {@link LoggerConfig}
 */
export interface LoggerConfigE {
    fichero: string;
    formato: string;
    colores: ColoresLogger;
}