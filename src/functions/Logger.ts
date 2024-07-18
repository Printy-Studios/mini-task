import chalk from 'chalk'

export type LogFilter = string[] | string | null

export default class Logger {

    enabled: boolean = true
    prefix: string
    filter: string[] | string = 'info'

    constructor(enabled: boolean = true, prefix: string = 'Log') {
        this.enabled = enabled
        this.prefix = prefix
    }

    log(args: any[] | any, type: string = 'info') {
        if (this.enabled && Logger.filtersMatch(this.filter, type)) {
            console.log(this.prefix ? (chalk.whiteBright(this.prefix + ': ')) : null, typeof args === 'string' ? args : [...args])
        }
    }

    static filtersMatch(filter1: LogFilter, filter2: LogFilter) {
        if( Array.isArray(filter1) ) {
            if( Array.isArray(filter2) ) {
                return filter1.findIndex(type => filter2.includes(type)) > -1
            } else {
                return filter1.includes(filter2)
            }
        } else if (Array.isArray(filter2)) {
            return filter2.includes(filter1)
        } else {
            return filter1 === filter2
        }
    }

    trace(){
        if (this.enabled) {
            console.trace()
        }
    }
}