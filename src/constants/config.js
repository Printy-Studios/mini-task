import getConfigFromFile from '#functions/getConfigFromFile.js';

let config = {};

export const loadConfig = async () => {
    const _config = await getConfigFromFile();
    for(const key in _config) {
        config[key] = _config[key];
    }
}

export default config;