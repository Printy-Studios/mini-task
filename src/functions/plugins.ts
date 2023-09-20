import * as fs from 'fs'
import * as path from 'path'
import { SaveIssueToFileFunction, PluginFunctions, PluginModule } from 'types/Plugin'

const plugins_dir = path.join(__dirname, '../../plugins')

type PluginMetadata = {
    id: string,
    plugin_path: string
    functions?: PluginFunctions
}

/**
 * Checks if given object has the specified keys
 * WARNING: this returns and array or true (so a truthy value in both cases).
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
    functions_loaded: boolean = false

    constructor() {

        //console.log('constructing plugin manager')

        const plugin_folder_names = fs.readdirSync(plugins_dir)

        for (const plugin_folder_name of plugin_folder_names) {
            const metadata = parsePluginIndex(path.join(plugins_dir, plugin_folder_name))
            if((metadata.id in this.plugins)) {
                throw new Error('Plugin id clash for ' + metadata.id)
            }
            this.plugins[metadata.id] = metadata
        }
    }

    getPluginMeta = (plugin_id: string) => {
        return this.plugins[plugin_id]
    }

    loadFunctions = async () => {
        console.log('Loading plugin functions')
        for (const plugin_id in this.plugins) {
            const current_plugin = this.plugins[plugin_id]
            const current_plugin_functions = current_plugin.functions
            if (current_plugin_functions) {
                let plugin_module: PluginModule
                try {
                    plugin_module = await import(path.join(current_plugin.plugin_path, 'index.js'))
                } catch (err) {
                    throw new Error('An error occured while loading plugin ' + current_plugin.id + ': ' + err)
                }
                for(const plugin_function_name in current_plugin_functions) {
                    if(!plugin_module[plugin_function_name]) {
                        console.warn(`In plugin ${current_plugin.id}: function ${ plugin_function_name } that is defined in index.json is not being exported in index.js|ts`)
                    } else {
                        this.functions[plugin_function_name] = plugin_module[plugin_function_name]
                    }
                }
            }
        }
    }
}

console.log('export running')

const plugins = new PluginManager()
plugins.loadFunctions()

global.minitask_plugins = plugins

// export default plugins