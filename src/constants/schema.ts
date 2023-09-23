import { JSONSchema } from 'types/JSONSchema'

export const minitask_config_plugins_schema: JSONSchema = {
    "enabled": {
        "required": true,
        "type": ["boolean"]
    },
    "config": {
        "required": false,
        "type": "object"
    }
}

export const minitask_config_schema: JSONSchema = {
    "issues-path": {
        "required": true,
        "type": "string"
    },
    "plugins": {
        "required": false,
        "type": "object"
    },
    "test_value": {
        "required": false,
        "type": "number"
    }
    // "plugins": {
    //     "required": false,
    //     "type": "object:config_plugin"
    // }
}