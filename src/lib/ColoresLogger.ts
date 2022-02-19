/**
 * Interfaz que define la paleta de colores
 */
export interface ColoresLogger {
    FINC: string;
    ROJO: string;
    VERDE: string;
    AMARILLO: string;
    AZUL: string;
}

/**
 *  Objeto los colores por defecto
 */
export const Colores: ColoresLogger = {
    FINC: "\x1b[0m",
    ROJO: "\x1b[31m",
    VERDE: "\x1b[32m",
    AMARILLO: "\x1b[33m",
    AZUL: "\x1b[34m"
};