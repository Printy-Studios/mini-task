export const JSONSchemaEntryResponse = {
    SUCCESS: 1,
    REQUIRED: 2,
    UNSPECIFIED: 3,
}

export default class JSONValidator {
    object_types = {}

    addObjectType = (type_name, object_type) => {
        this.object_types[type_name] = object_type
    }

    validateSingle(entry, schema_entry) {
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
     * @param obj 
     * @param schema 
     * @param { boolean } [stop=false] Whether to stop validation at first error
     * @returns 
     */
    validate = (obj, schema, stop = true) => {

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