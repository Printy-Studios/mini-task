// Util
import Logger from './Logger';
import getConfigFromFile from './getConfigFromFile';

const logger = new Logger(true, 'Log');

/**
 * Returns customPath that is provided if it's a string, otherwise returns the default issues-path from config
 * @param { string } customPath - optional custom path.
 * 
 * @returns { string } customPath if it is defined, otherwise default issues-path
 */
export default function customPathOrDefault(customPath: string) {
    if( !customPath ) {
        logger.log('Target path not specified, getting one from minitask config');
        const config = getConfigFromFile();

        if (!config) {
            throw new Error('Could not find minitask config');
        }

        logger.log('Target path: ' + customPath);
        return config['issues-path'];
    }

    return customPath
}