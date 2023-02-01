import * as log4js from 'log4js'

const logsFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")

export const config: log4js.Config = {
  appenders: {
    console: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p] -%] %m"
      }
    },
    app: {
      type: "file",
      filename: logsFolder + "/fizard/app.log",
      maxLogSize: 10485760,
      numBackups: 3,
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-MM-dd hh:mm:ss:SSS}] [%p] %f{1}:%l - %m"
      }
    }
  },
  categories: {
    default: {
      appenders: [
        "app"
      ],
      level: "INFO",
      enableCallStack: true
    },
    console: {
      appenders: [
        "console"
      ],
      level: "INFO"
    }
  }
}