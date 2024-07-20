import * as path from 'path'

import findFileUp from 'utils/findFileUp'

import { MinitaskConfig } from 'types/Config'
import { minitask_config_schema } from 'constants/schema'

//Util
import Logger from './Logger'

//Types
import { JSONSchemaEntryResponse } from 'enums/JSONSchema'

//Functions
import JSONValidator from './JSONValidator'

const logger = new Logger(true, 'Log')

/**
 * Get config from file
 * @returns 
 */
export default function getConfigFromFile() {

    const config_file_json = findFileUp('minitask.json', process.env.INIT_CWD, true, 5)
    const config_file_js = findFileUp('minitask.js', process.env.INIT_CWD, false, 5)


    let file_path: string
    let config: MinitaskConfig

    /* 
    Load either .js or .json, whichever is found(.js checked first). 
    Throw error if neither are found 
    */
    if ( config_file_js ) {
        throw new Error('For now .js config is not supported, please use .json');
        /* 
         config = (await import(path.join(config_file_js.path, 'minitask.js'))).default
        Need a different approach that doens't use await so we don't have to make all dependant functions async*/
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