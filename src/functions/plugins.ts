import * as fs from 'fs'
import * as path from 'path'
import { SaveIssueToFileFunction, PluginFunctions } from 'types/PluginFunctions'

const plugins_dir = path.join(__dirname, '../../plugins')

type PluginMetadata = {
    id: string,
    plugin_path: string
    functions?: string
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
        'id',
        'plugin_path'
    ]
    
    const missing_keys = hasKeys(metadata, required_keys)

    if (typeof missing_keys === 'object') {
        throw new Error('The following properties are missing from ' + index_json_path + ': ' + missing_keys)
    }

    return metadata
}


class PluginManager {
    plugins: PluginMetadata[] = []
    functions_loaded: boolean = false

    constructor() {

        console.log('constructing plugin manager')

        const plugin_folder_names = fs.readdirSync(plugins_dir)

        for (const plugin_folder_name of plugin_folder_names) {
            const metadata = parsePluginIndex(plugin_folder_name)
            if((metadata.id in this.plugins)) {
                throw new Error('Plugin id clash for ' + metadata.id)
            }
            this.plugins[metadata.id] = metadata
        }
    }

    getPluginMeta = (plugin_id: string) => {
        return this.plugins[plugin_id]
    }

    loadFunctions = () => {

    }
}

console.log('inside export')

const plugins = new PluginManager()

export default plugins