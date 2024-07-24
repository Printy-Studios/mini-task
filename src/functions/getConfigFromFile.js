import * as path from 'path';
import url from 'url';

import findFileUp from '#utils/findFileUp.js';

import { minitask_config_schema } from '#constants/schema.js';

//Util
import Logger from './Logger.js';

//Functions
import JSONValidator, { JSONSchemaEntryResponse } from './JSONValidator.js';

const logger = new Logger(true, 'Log');

/**
 * Get config from file
 * @returns 
 */
export default async function getConfigFromFile() {

    const config_file_json = findFileUp('minitask.json', process.env.INIT_CWD, true, 5);
    const config_file_js = findFileUp('minitask.js', process.env.INIT_CWD, false, 5);


    let file_path;
    let config;

    /* 
        Load either .js or .json, whichever is found(.js checked first). 
        Throw error if neither are found 
    */
    if ( config_file_js ) {
        config = (await import(url.pathToFileURL(path.join(config_file_js.path, 'minitask.js')))).default
        file_path = config_file_js.path
        logger.log('Found minitask.js config file at ' + file_path)
    } else if (config_file_json) {
        config = JSON.parse(config_file_json.str)
        file_path = config_file_json.path
        logger.log('Found minitask.json config file at ' + file_path)
    } else {
        // return null
        throw new Error('Could not find minitask config file')
    }


    //Validate config schema
    logger.log('Validating config schema')

    const validator = new JSONValidator()

    const validation_response = validator.validate(config, minitask_config_schema)

    //If validation failed, parse response and throw it
    if (validation_response !== JSONSchemaEntryResponse.SUCCESS) {
        let err_message = ''
        const entry_name = validation_response.entry_name
        switch (validation_response.response) {
            case JSONSchemaEntryResponse.REQUIRED: {
                err_message = `${entry_name} is required`
                break
            }
            case JSONSchemaEntryResponse.TYPE: {
                err_message = `${entry_name} is of wrong type`
                break
            }
            case JSONSchemaEntryResponse.UNSPECIFIED: {
                err_message = `unknown property ${entry_name}`
                break
            }
        }
        throw new Error('Invalid minitask config: ' + err_message)
    }

    config['issues-path'] = path.resolve(file_path, config['issues-path'])

    return config
}