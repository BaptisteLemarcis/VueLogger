/* eslint-disable no-console */

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4
}

class LoggerClass {
  constructor (options) {
    this.options = LoggerClass.getDefaultOptions()
    this.initialized = false

    this.validateLevel = function (level) {
      if (Number.isInteger(level) && level >= LogLevel.DEBUG && level <= LogLevel.FATAL) {
        return true
      }
      return false
    }

    this.validateOptions = function (options) {
      if (options !== undefined) {
        for (let prop in Object.getOwnPropertyNames(this.options)) {
          if (Object.prototype.hasOwnProperty.call(options, prop)) {
            this.options[prop] = options[prop]
          }
        }
        this.initialized = true
      }
    }

    this.validateOptions(options)
  }

  print (level, moduleName, message) {
    if (!this.initialized) {
      console.error('Error : Logger not initialized')
    } else {
      let hasError = false
      if (level === undefined || level === '') {
        console.error('Error : [Logger] Level argument invalid')
        hasError = true
      }

      if (moduleName === undefined || moduleName === '') {
        console.error('Error : [Logger] ModuleName argument invalid')
        hasError = true
      }

      if (message === undefined || message === '') {
        console.error('Error : [Logger] Message argument invalid')
        hasError = true
      }

      if (!hasError) {
        if (!this.validateLevel(level)) {
          level = LogLevel.INFO
        }
        if (level >= this.options.minLevelToPrint) {
          if (this.options.printModuleName) {
            message = '[' + moduleName + '] ' + message
          }

          let pre = ''
          let currentTime = new Date().toLocaleString()
          let timeToConcat = (this.options.printLogTime) ? currentTime + ' ' : ''
          switch (level) {
            case LogLevel.DEBUG:
              pre = (this.options.printLevelInfos) ? 'DEBUG : ' : ''
              pre += timeToConcat
              console.debug(pre + message)
              break
            case LogLevel.INFO:
              pre = (this.options.printLevelInfos) ? 'INFO : ' : ''
              pre += timeToConcat
              console.info(pre + message)
              break
            case LogLevel.WARN:
              pre = (this.options.printLevelInfos) ? 'WARNING : ' : ''
              pre += timeToConcat
              console.warn(pre + message)
              break
            case LogLevel.ERROR:
              pre = (this.options.printLevelInfos) ? 'ERROR : ' : ''
              pre += timeToConcat
              console.error(pre + message)
              break
            case LogLevel.FATAL:
              pre = (this.options.printLevelInfos) ? 'FATAL : ' : ''
              pre += timeToConcat
              console.error(pre + message)
              break
            default:
              pre = (this.options.printLevelInfos) ? 'INFO : ' : ''
              pre += timeToConcat
              console.error(pre + message)
              break
          }
        }
      }
    }
  }

  static getDefaultOptions () {
    return {
      minLevelToPrint: LogLevel.DEBUG,
      printModuleName: true,
      printLogTime: false,
      printLevelInfos: true
    }
  }
}

export const VueLogger = {
  install (Vue, options) {
    Vue.prototype.$logger = new LoggerClass(options)
    Vue.prototype.$LogLevel = LogLevel
  }
}

export const Logger = function (options) {
  return new LoggerClass(options)
}
