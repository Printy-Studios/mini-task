import getConfigFromFile from 'functions/getConfigFromFile';

let config = null;

export const loadConfig = async () => {
    config = await getConfigFromFile();
}

export default config;