import * as fs from 'fs'
import * as path from 'path'
import log from './log'
import { 
    PluginMetadata, 
    PluginFunctions, 
    PluginModule,
    Plugin,
    PluginConstants
 } from 'types/Plugin'
import { MinitaskConfig, MinitaskConfigPlugin } from 'types/Config'
import getConfigFromFile from './getConfigFromFile'

const plugins_dir = path.join(__dirname, '../../plugins')

/**
 * Checks if given object has the specified keys
 * **WARNING:** this returns and array or true (so a truthy value in both cases).
 * If you want to check if there are any missing keys, check if the type of the return
 * value is an object
 * @param {object}   obj   object to check
 * @param {string[]} keys  keys to check
 * 
 * @returns {string[] | true} an array with missing keys, true if all keys present
 */
const hasKeys = (obj: object, keys: string[]): string[] | true => {
    const missing_keys = []
    for (const key of keys) {
        if(!(key in obj)) {
            missing_keys.push(key)
        }
    }

    return missing_keys.length === 0 ? true : missing_keys
}

const parsePluginIndex = (plugin_folder_path: string): PluginMetadata => {

    const index_json_path = path.join(plugin_folder_path, 'index.json')

    const index_json_exists = fs.existsSync(index_json_path)

    if (!index_json_exists) {
        throw new Error('Could not find index.json in ' + plugin_folder_path)
    }

    const index_json_str = fs.readFileSync(index_json_path, {encoding: 'utf-8'})

    const metadata: PluginMetadata = JSON.parse(index_json_str)

    if(!('id' in metadata)) {
        throw new Error('id property not found in ' + index_json_path)
    }

    const required_keys = [
        'id'
    ]
    
    const missing_keys = hasKeys(metadata, required_keys)

    if (typeof missing_keys === 'object') {
        throw new Error('The following properties are missing from ' + index_json_path + ': ' + missing_keys)
    }

    metadata.plugin_path = plugin_folder_path

    return metadata
}


class PluginManager {
    plugins: {
        [plugin_id: string]: PluginMetadata   
    } = {}
    functions: PluginFunctions = {}
    constants: PluginConstants = {}
    functions_loaded: boolean = false

    constructor(minitask_config?: MinitaskConfig) {
        log('Constructing a PluginManager instance')
        if(!minitask_config) {
            minitask_config = getConfigFromFile()
        }

        if (!minitask_config.plugins) {
            log('No plugins specified in minitask.json, skipping plugin manager initialization')
            return
        }

        const plugin_folder_names = fs.readdirSync(plugins_dir)

        const isPluginEnabled = (plugin: MinitaskConfigPlugin) => {
            return (
                (
                    typeof plugin === 'object' &&
                    plugin.enabled
                ) ||
                (
                    typeof plugin === 'boolean' &&
                    plugin === true
                )
            )
        }

        for (const plugin_id in minitask_config.plugins) {
            if (
                plugin_folder_names.includes(plugin_id) &&
                isPluginEnabled(minitask_config.plugins[plugin_id])
            ) {
                const metadata = parsePluginIndex(path.join(plugins_dir, plugin_id))
                if((metadata.id in this.plugins)) {
                    throw new Error('Plugin id clash for ' + metadata.id)
                }
                metadata.enabled = true
                this.plugins[metadata.id] = metadata
                log('Plugin ' + plugin_id + ' enabled')
            } else {
                log('Plugin ' + plugin_id + ' not defined in minitask.json or disabled, skipping')
            }
            
        }
    }

    getPluginMeta = (plugin_id: string) => {
        return this.plugins[plugin_id]
    }

    /**
     * Load exports from a plugin's module according to the passed exports list
     * and load them onto the passed variable
     * @param { Plugin } plugin   plugin which's modules to export
     * @param { object } _exports object where keys are the export names
     * @param { object } loadonto object on which to load the exports, such as 
     * this.functions | this.constants | etc.
     * 
     * @returns { null | _exports } null or list of exports that were missing if there were any
     */
    loadPluginModuleExports = (_module: PluginModule, _exports: { [property: string]: any}, loadonto: PluginModule) => {

        const missing_exports = {}

        for(const export_name in _exports) {
            if(!_module[export_name]) {
                missing_exports[export_name] = _exports[export_name]
            } else {
                loadonto[export_name] = _module[export_name]
            }
        }

        return Object.keys(missing_exports).length ? missing_exports : null
    }

    loadModules = async () => {
        log('Loading plugin modules')
        for (const plugin_id in this.plugins) {
            const current_plugin = this.plugins[plugin_id]
            if (!current_plugin.enabled) {
                log(`Plugin ${current_plugin.id} is disabled, skipping`)
                continue
            }
            const current_plugin_functions = current_plugin.functions
            const current_plugin_constants = current_plugin.constants
            if (
                current_plugin_functions ||
                current_plugin_constants
            ) {
                let plugin_module: PluginModule
                try {
                    plugin_module = await import(path.join(current_plugin.plugin_path, 'index.js'))
                } catch (err) {
                    throw new Error('An error occured while loading plugin ' + current_plugin.id + ': ' + err)
                }

                

                if (current_plugin_functions) {
                    const missing_exports = this.loadPluginModuleExports(plugin_module, current_plugin_functions, this.functions) 
                    if (missing_exports) {
                        for (const export_name in missing_exports) {
                            console.warn(`In plugin ${current_plugin.id}: function ${ export_name } that is defined in index.json is not being exported in index.js|ts`)
                        }
                    }
                }
                if (current_plugin_constants) {
                    const missing_exports = this.loadPluginModuleExports(plugin_module, current_plugin_constants, this.constants) 
                    if (missing_exports) {
                        for (const export_name in missing_exports) {
                            console.warn(`In plugin ${current_plugin.id}: constant ${ export_name } that is defined in index.json is not being exported in index.js|ts`)
                        }
                    }
                }
                
            }
        }
    }
}

export default PluginManager