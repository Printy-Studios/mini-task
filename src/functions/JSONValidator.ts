//Types
import { 
    JSONSchemas, 
    JSONSchema,
    JSONSchemaEntry,
    JSONSchemaResponseWithStop
} from 'types/JSONSchema'

import {
    JSONSchemaEntryResponse
} from 'enums/JSONSchema'


export default class JSONValidator {
    object_types: JSONSchemas = {}

    addObjectType = (type_name: string, object_type: JSONSchema) => {
        this.object_types[type_name] = object_type
    }

    validateSingle(entry: any, schema_entry: JSONSchemaEntry): JSONSchemaEntryResponse {
        const err_response: JSONSchemaEntryResponse[] = []

        console.log(schema_entry)
        if (!schema_entry) {
            return JSONSchemaEntryResponse.UNSPECIFIED
            //err_response.push()
        }
        else if (!entry && schema_entry.required) {
            return JSONSchemaEntryResponse.REQUIRED
            //err_response.push(JSONSchemaEntryResponse.REQUIRED)
        }
        else if(typeof entry !== schema_entry.type) {
            return JSONSchemaEntryResponse.TYPE
            //err_response.push(JSONSchemaEntryResponse.TYPE)
        }

        return JSONSchemaEntryResponse.SUCCESS//err_response.length ? err_response : JSONSchemaEntryResponse.SUCCESS
    }

    /**
     * Validate object against schema
     * @param obj 
     * @param schema 
     * @param { boolean } [stop=false] Whether to stop validation at first error
     * @returns 
     */
    validate = (obj: object, schema: JSONSchema, stop = true):
        JSONSchemaResponseWithStop |
        JSONSchemaEntryResponse.SUCCESS => {

        for(const key in schema) {
            if(schema[key].required && !(key in obj)) {
                if (stop) {
                    return {
                        entry_name: key,
                        response: JSONSchemaEntryResponse.REQUIRED
                    }
                }
            }
        }    

        for(const key in obj){
            const validation_response = this.validateSingle(obj[key], schema[key])
            console.log(validation_response)
            if (validation_response !== JSONSchemaEntryResponse.SUCCESS) {
                if( stop ) {
                    return {
                        entry_name: key,
                        response: validation_response
                    }
                }
            }
        }

        if( stop ) {
            return JSONSchemaEntryResponse.SUCCESS
        }
    }
}