import chalk from 'chalk'

/**
 * Logging utility class
 */
export default class Logger {

    /**
     * Whether logging is enabled. If false, no logs will be printed to the console
     * 
     * @type { boolean }
     */
    enabled = true;

    /**
     * @type { string | undefined }
     * 
     * An optional prefix before a log entry
     */
    prefix;

    /**
     * The current filter.s. Logger will only log the logs whose `type` param matches/includes the `filter`.
     * 
     * @type { string | string[] }
     */
    filter= 'info';

    /**
     * 
     * @param { boolean } [enabled = true] - Whether Logger is enabled
     * @param { string } [prefix = 'Log'] - Prefix of the log
     */
    constructor(enabled = true, prefix = 'Log') {
        this.enabled = enabled
        this.prefix = prefix
    }

    /**
     * Log a string to the console
     * 
     * @param { string | string[] } args - Message or array of messages to log 
     * @param { string | string[] } type - The type of log, used for filtering
     * 
     * @returns { void }
     */
    log(args, type = 'info') {
        if (this.enabled && Logger.filtersMatch(this.filter, type)) {
            console.log(this.prefix ? (chalk.whiteBright(this.prefix + ': ')) : null, typeof args === 'string' ? args : [...args])
        }
    }

    /**
     * Check if two filters/types or arrays of filters/types have an overlap/match
     * @param { string | string[] } filter1 
     * @param { string | string[] } filter2 
     * 
     * @returns { boolean } - True if both filters match or have an overlap if either of them are arrays
     */
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

    /**
     * Wrapper for console.trace()
     * 
     * @returns { void }
     */
    trace(){
        if (this.enabled) {
            console.trace()
        }
    }
}