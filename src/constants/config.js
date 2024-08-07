/** @import { MinitaskConfig } from '../types/Config' */

import getConfigFromFile from '#functions/getConfigFromFile.js';

/**
 * Minitask configuration object 
 * 
 * @type { MinitaskConfig | {} }
 */
let config = {};

/**
 * Load config from a config file and populate the exported 'config' object. 
 * Should be called before accessing the 'config' export.
 */
export const loadConfig = async () => {
    const _config = await getConfigFromFile();
    for(const key in _config) {
        config[key] = _config[key];
    }
}

export default config;