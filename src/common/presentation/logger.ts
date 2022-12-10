import * as log4js from 'log4js'


class Logger{

    private _logger: log4js.Logger

    constructor(logger: string){
        this._logger = log4js.getLogger(logger);
    }

    trace(log: string){
        this._logger.trace(log)
    }

    debug(log: string){
        this._logger.debug(log)
    }

    info(log: string){
        this._logger.info(log)
    }

    warn(log: string){
        this._logger.warn(log)
    }

    error(log: string){
        this._logger.error(log)
    }

    fatal(log: string){
        this._logger.fatal(log)
    }
}

export const logger = new Logger('default')
export const loggerDebug = new Logger('debug')