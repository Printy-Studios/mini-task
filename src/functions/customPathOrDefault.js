// Util
import Logger from './Logger.js';

// Constants 
import config from '#constants/config.js';

const logger = new Logger(true, 'Log');

/**
 * Returns customPath that is provided if it's a string, otherwise returns the default issues-path from config
 * @param { string } [customPath] - optional custom path.
 * 
 * @returns { string } customPath if it is defined, otherwise default issues-path
 */
export default function customPathOrDefault(customPath) {
    if( !customPath ) {
        logger.log('Target path not specified, getting one from minitask config');

        //console.log('config: ', config);

        if (!config) {
            throw new Error('Could not find minitask config');
        }

        logger.log('Target path: ' + config['issues-path']);
        return config['issues-path'];
    }

    return customPath
}