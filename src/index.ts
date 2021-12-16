import { LoggerError } from "./lib/Error";
import { Colores, ColoresLogger } from "./lib/ColoresLogger";
import { funcion_comprobar_defecto, funcion_insertar_defecto, Logger_DB } from "./lib/Logger_DB";
import { LoggerConfig, LoggerConfigE, LoggerDB_Config, LoggerDB_ConfigE, Funcion_comprobar, Funcion_insertar } from "./lib/LoggerConfig";
import { NIVEL_LOG, Logger, formato_defecto, formato_error_defecto } from "./lib/Logger";

export {
    Colores,
    ColoresLogger,
    formato_defecto,
    formato_error_defecto,
    Funcion_comprobar,
    Funcion_insertar,
    funcion_comprobar_defecto,
    funcion_insertar_defecto,
    Logger,
    LoggerConfig,
    LoggerConfigE,
    Logger_DB,
    LoggerDB_Config,
    LoggerDB_ConfigE,
    LoggerError,
    NIVEL_LOG
};