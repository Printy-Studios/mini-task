/** @import { JSONSchemaEntry, JSONSchemaResponse } from '../types/JSONSchema' */

export const JSONSchemaEntryResponse = {
    SUCCESS: 1,
    REQUIRED: 2,
    UNSPECIFIED: 3,
}

/**
 * A basic class for validating objects against a JSON schema
 */
export default class JSONValidator {
    /**
     * Validate a single entry/value
     * @param { any } entry Entry/value to validate
     * @param { JSONSchemaEntry } schema_entry 
     * @returns { typeof JSONSchemaEntryResponse[keyof JSONSchemaEntryResponse]}
     */
    static validateSingle(entry, schema_entry) {
        const err_response = []

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
     * @param { object } obj Object to validate
     * @param { object } schema Schema to validate against
     * @param { boolean } [stop=false] Whether to stop validation at first error
     * @returns 
     */
    static validate = (obj, schema, stop = true) => {

        const errors = []

        for(const key in schema) {
            if(schema[key].required && !(key in obj)) {
                const ENTRY_RESPONSE = {
                    entry_name: key,
                    response: JSONSchemaEntryResponse.REQUIRED
                }
                if (stop) return [ENTRY_RESPONSE];
                else errors.push(ENTRY_RESPONSE);
            }
        }    

        for(const key in obj){
            const validation_response = this.validateSingle(obj[key], schema[key])
            if (validation_response !== JSONSchemaEntryResponse.SUCCESS) {
                const ENTRY_RESPONSE = [{
                    entry_name: key,
                    response: validation_response
                }]
                if (stop) return [ENTRY_RESPONSE];
                else errors.push(ENTRY_RESPONSE);
            }
        }

        if(errors.length) {
            return errors;
        } else {
            return JSONSchemaEntryResponse.SUCCESS
        }
    }
}