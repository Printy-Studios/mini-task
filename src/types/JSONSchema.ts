import { JSONSchemaEntryResponse } from 'enums/JSONSchema'

export type JSONSchemaEntry = {
    required: boolean,
    type: string | string[],
}

export type JSONSchema = {
    [entry: string]: JSONSchemaEntry
}

export type JSONSchemas = {
    [schema_name: string]: JSONSchema
}

export type JSONSchemaResponse = {
    
}

export type JSONSchemaResponseWithStop = {
    entry_name: string,
    response: JSONSchemaEntryResponse | JSONSchemaEntryResponse[]
}