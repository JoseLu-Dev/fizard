import * as log4js from 'log4js'
import * as cliProgress from 'cli-progress'
import { createSpinner } from 'nanospinner'
import { config } from '../config/log4js.config';
const chalk = require('chalk');

log4js.configure(config)

class LogQueue {

    private readonly queue: Log[] = []

    add(log: Log) {
        this.queue.push(log)
    }

    next() {
        return this.queue.shift()
    }
}

interface Log {
    logLevel: LogLevel
    log: string
}

enum LogLevel {
    INFO, WARN, ERROR, FATAL
}

export enum Color {
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
    GRAY = 'gray'
}

class Cli {

    private readonly loggerCli = log4js.getLogger('console')
    private readonly loggerFile = log4js.getLogger()

    private readonly logQueue: LogQueue = new LogQueue()

    private readonly spinner = createSpinner()
    private isSpinning: boolean = false

    private readonly loading = new cliProgress.SingleBar({
        format: '{processName} |' + chalk.green('{bar}') + '| {percentage}% || {value}/{total} || Time elapsed: {duration_formatted}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })
    private isLoading: boolean = false

    info(log: string) {
        this.loggerFile.info(log)
        this.logCli({ logLevel: LogLevel.INFO, log: log })
    }

    warn(log: string) {
        this.loggerFile.warn(log)
        this.logCli({ logLevel: LogLevel.WARN, log: log })
    }

    error(log: string) {
        this.loggerFile.error(log)
        this.logCli({ logLevel: LogLevel.ERROR, log: log })
    }

    fatal(log: string) {
        this.loggerFile.fatal(log)
        this.logCli({ logLevel: LogLevel.FATAL, log: log })
    }

    private logCli(log: Log) {

        if (this.isLoading || this.isSpinning) {
            return this.logQueue.add(log)
        }

        this.log(log, this.loggerCli)
    }

    private logPending() {

        let log = this.logQueue.next()

        while (log) {
            this.log(log, this.loggerCli)

            log = this.logQueue.next()
        }
    }

    private log(log: Log, logger: log4js.Logger) {

        switch (log.logLevel) {
            case LogLevel.INFO: logger.info(log.log)
                break;
            case LogLevel.WARN: logger.warn(log.log)
                break;
            case LogLevel.ERROR: logger.error(log.log)
                break;
            case LogLevel.FATAL: logger.fatal(log.log)
                break;
        }

    }

    spinnerStart(text: string, color: Color) {
        this.spinner.start({
            text: text,
            color: color,
        })
        this.isSpinning = true
    }

    spinnerSuccess() {
        this.spinner.success()
        this.onSpinnerStopped()
    }

    spinnerWarn() {
        this.spinner.warn()
        this.onSpinnerStopped()
    }

    spinnerError() {
        this.spinner.error()
        this.onSpinnerStopped()
    }

    private onSpinnerStopped() {
        this.isSpinning = false
        this.logPending()
    }

    loadingStart(total: number, processName: string) {
        this.isLoading = true
        this.loading.start(total, 0, {processName: processName})
    }

    loadingUpdate(progress: number) {
        this.loading.update(progress)
    }

    loadingEnd() {
        this.loading.stop()
        this.onLoadingStopped()
    }

    private onLoadingStopped() {
        this.isLoading = false
        this.logPending()
    }

}

export const cli = new Cli()
