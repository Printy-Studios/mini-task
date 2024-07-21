import chalk from 'chalk'

export default class Logger {

    enabled = true;
    prefix;
    filter= 'info';

    constructor(enabled = true, prefix = 'Log') {
        this.enabled = enabled
        this.prefix = prefix
    }

    log(args, type = 'info') {
        if (this.enabled && Logger.filtersMatch(this.filter, type)) {
            console.log(this.prefix ? (chalk.whiteBright(this.prefix + ': ')) : null, typeof args === 'string' ? args : [...args])
        }
    }

    static filtersMatch(filter1, filter2) {
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