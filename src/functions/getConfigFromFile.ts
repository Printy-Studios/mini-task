import * as path from 'path'

import findFileUp from 'utils/findFileUp'

import { MinitaskConfig } from 'types/Config'
import { minitask_config_schema } from 'constants/schema'

//Util
import log from './log'

//Types
import { JSONSchemaEntryResponse } from 'enums/JSONSchema'

//Functions
import JSONValidator from './JSONValidator'

export default function getConfigFromFile() {
    const config_file = findFileUp('minitask.json', process.env.INIT_CWD, true, 5)

    if (config_file) {

        const config: MinitaskConfig = JSON.parse(config_file.str)

        log('Validating config schema')

        const validator = new JSONValidator()

        const validation_response = validator.validate(config, minitask_config_schema)

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
            throw new Error('Invalid minitask.json: ' + err_message)
        }

        //log('Validation result:', response)

        //log(config)

        config['issues-path'] = path.join(config_file.path, config['issues-path'])
        return config
    } else {
        return null
        //throw new Error('Could not find minitask.json')
    }
}