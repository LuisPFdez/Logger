/**
 * Error que es lanzado al surgir cualquier fallo en la clase {@link Logger}
 */
 export class LoggerError extends Error {

    /**
     * @param msg mensaje del error
     */
    constructor(msg: string = "Error en el logger") {
        super(msg);
        this.name = "LoggerError";
    }

}