/**
 * JSON Schemas
 */

/**
 * Plugin configuration schema
 */
export const minitask_config_plugins_schema = {
    "enabled": {
        "required": true,
        "type": ["boolean"]
    },
    "config": {
        "required": false,
        "type": "object"
    }
}

/**
 * Minitask configuration schema
 */
export const minitask_config_schema = {
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