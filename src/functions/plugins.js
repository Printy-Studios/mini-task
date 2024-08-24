/** @import { 
 *      PluginMetadata,
 *      PluginFunctions,  
 *      PluginConstants,
 *      Plugin
 * } from '../types/Plugin.js' 
 * 
 * @import {
 *  MinitaskConfig,
 MinitaskConfigPlugin
 * } from '../types/Config.js'
 * 
 * */

import * as fs from 'fs';
import * as path from 'path';
import url from 'url';
import Logger from './Logger.js'
import config from '#constants/config.js';

const logger = new Logger(true, 'Log')


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const plugins_dir = path.join(__dirname, '../../plugins')

/**
 * Retrieves the missing keys of an object

 * @param {object}   obj   object to check
 * @param {string[]} keys  keys to look for
 * 
 * @returns {string[] | false} an array with the `keys` that the `obj` doesn't have, false if none are missing
 */
const getMissingKeys = (obj, keys) => {
    const missing_keys = []
    for (const key of keys) {
        if(!(key in obj)) {
            missing_keys.push(key)
        }
    }

    return missing_keys.length === 0 ? false : missing_keys
}

/**
 * Parse a plugin's index.json file
 * 
 * @param { string } plugin_folder_path - Path to the plugin's folder
 * 
 * @throws if index.json file not found or if it's of invalid format
 * 
 * @returns { PluginMetadata }
 */
const parsePluginIndex = (plugin_folder_path) => {

    const index_json_path = path.join(plugin_folder_path, 'index.json')

    const index_json_exists = fs.existsSync(index_json_path)

    if (!index_json_exists) {
        throw new Error('Could not find index.json in ' + plugin_folder_path)
    }

    const index_json_str = fs.readFileSync(index_json_path, {encoding: 'utf-8'})

    const metadata = JSON.parse(index_json_str)

    if(!('id' in metadata)) {
        throw new Error('id property not found in ' + index_json_path)
    }

    const required_keys = [
        'id'
    ]
    
    const missing_keys = getMissingKeys(metadata, required_keys)

    if (missing_keys) {
        throw new Error('The following properties are missing from ' + index_json_path + ': ' + missing_keys)
    }

    metadata.plugin_path = plugin_folder_path

    return metadata
}

/**
 * Class for managing plugins
 */
class PluginManager {
    /**
     * Object of all the plugins' metadata, with the keys being their IDs
     * 
     * @type { { [pluginId: string]: PluginMetadata } }
     */
    plugins = {}

    /**
     * Function extensions/overrides that are used in the app
     * 
     * @type { PluginFunctions }
     */
    functions = {
        parseIssueDescription: []
    }

    /**
     * Constants overriden by plugins
     * 
     * @type { PluginConstants }
     */
    constants = {}

    /**
     * Whether the functions have loaded
     * 
     * @type { boolean }
     */
    functions_loaded = false

    /**
     * The config object of minitask
     * 
     * @type { MinitaskConfig }
     */
    minitask_config

    /**
     * Empty constructor. Must call init() method before using this class(need to use
     * init() because constructors don't support async, which we need)
     */
    constructor() {
        
    }

    /**
     * Parse plugin configuration in minitask config and determine whether it is enabled or not.
     * @param { MinitaskConfigPlugin } plugin 
     * @returns { boolean } True if enabled, false if not.
     */
    static isPluginEnabled = (plugin) => {
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

    /**
     * Initialize the class. And parse plugins' configuration and store them in 
     * `this.plugins` 
     * 
     * @param { MinitaskConfig } minitask_config 
     * 
     * @throws if there's an id clash between plugins
     * 
     * @returns { void }
     */
    init(minitask_config) {
        logger.log('Constructing a PluginManager instance')
        if(!minitask_config) {
            throw new Error("Minitask config object hasn't been provided");
        }

        if (!this.minitask_config?.plugins) {
            logger.log('No plugins specified in minitask.json, skipping plugin manager initialization')
            return
        }

        const plugin_folder_names = fs.readdirSync(plugins_dir)

        //Add plugin metadata from plugins folder for plugins that are enabled
        for (const plugin_id in this.minitask_config.plugins) {
            if (
                plugin_folder_names.includes(plugin_id) &&
                PluginManager.isPluginEnabled(this.minitask_config.plugins[plugin_id])
            ) {
                const metadata = parsePluginIndex(path.join(plugins_dir, plugin_id))
                if((metadata.id in this.plugins)) {
                    throw new Error('Plugin id clash for ' + metadata.id)
                }
                metadata.enabled = true
                this.plugins[metadata.id] = metadata
                logger.log('Plugin ' + plugin_id + ' enabled')
            } else {
                logger.log('Plugin ' + plugin_id + ' not installed or disabled, skipping')
            } 
        }

        const config_plugin_ids = Object.keys(this.minitask_config.plugins)

        for (const plugin_folder_name of plugin_folder_names) {
            if (!config_plugin_ids.includes(plugin_folder_name)) {
                logger.log('Warning: Plugin ' + plugin_folder_name + ' installed but not defined in minitask.json')
            }
        }
    }

    getPluginMeta = (plugin_id) => {
        return this.plugins[plugin_id]
    }

    /**
     * Load exports from a plugin's module onto the passed variable
     * @param { Plugin }    plugin_exports      exports from plugin such as 'functions' or 'constants'
     * @param { object }    loadonto    object in which to store the exports, such as 
     * this.functions | this.constants | etc.
     * 
     * @returns { void }
     * Throws error if there are conficts with existing loaded exports
     */
    loadPluginModuleExports = (plugin_exports, loadonto) => {
        for(const export_name in plugin_exports) {
            if (Array.isArray(loadonto[export_name])) {
                loadonto[export_name].push(...plugin_exports[export_name])
            }
            else if (loadonto[export_name]) {
                throw new Error('Clash between plugin exports ' + export_name)
            } else {
                loadonto[export_name] = plugin_exports[export_name]
            }
        }

        
    }

    /**
     * Load modules for plugins that are enabled. Additionally set the configuration
     * for plugins as defined in minitask.json
     * 
     * @returns { Promise<void> }
     */
    loadModules = async () => {
        logger.log('Loading plugin modules')
        for (const plugin_id in this.plugins) {
            const current_plugin = this.plugins[plugin_id]
            if (!current_plugin.enabled) {
                logger.log(`Plugin ${current_plugin.id} is disabled, skipping`)
                continue
            }
            const current_plugin_functions = current_plugin.functions
            const current_plugin_constants = current_plugin.constants
            if (
                current_plugin_functions ||
                current_plugin_constants
            ) {
                let plugin_module
                try {
                    plugin_module = await import(url.pathToFileURL(path.join(current_plugin.plugin_path, 'index.js')).href)
                } catch (err) {
                    throw new Error('An error occured while loading plugin ' + current_plugin.id + ': ' + err)
                }
                
                //Set configuration for plugin according to the plugin's configuration in minitask.json
                if (plugin_module.functions?.setConfig) {
                    plugin_module.functions.setConfig(this.minitask_config.plugins[plugin_id])
                }

                if (plugin_module.functions) {
                    this.loadPluginModuleExports(plugin_module.functions, this.functions)
                }
                if (plugin_module.constants) {
                    this.loadPluginModuleExports(plugin_module.constants, this.constants)
                }
                
            }
        }
    }
}

const plugins = new PluginManager();

export default plugins;