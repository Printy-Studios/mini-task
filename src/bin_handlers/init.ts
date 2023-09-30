import * as fs from 'fs'
import * as path from 'path'
import findFileUp from 'utils/findFileUp'

import log from 'functions/log'

export const command = 'init'

/**
 * Initialize a minitask directory for user. Minitask directory holds user settings
 * and plugins
 * @param {string}  target_folder path to folder where to initialize minitask folder
 * @param {boolean} overwrite whether to overwrite folder if it already exists
 */
const initForUser = (target_folder: string, overwrite = false) => {
    target_folder = path.join(target_folder, 'minitask')
    const path_exists = fs.existsSync(target_folder)
    if(path_exists && !overwrite) {
        throw new Error('Could not initialize minitask user directory: folder already exists')
    } else if (path_exists) {
        fs.rmSync(target_folder, { recursive: true } )
    }
    fs.mkdirSync(target_folder)
    //fs.mkdirSync(target_folder, )
}

const findLocalNodeModulesFolder = (search_from_path: string) => {
    const package_json_path = findFileUp('package.json', search_from_path, false, 5).path
    const node_modules_path = path.join(package_json_path, 'node_modules')
    const node_module_folder_exists = fs.existsSync(node_modules_path)
    if (!node_module_folder_exists) {
        throw new Error(`package.json found at ${package_json_path} but no node_modules folder`)
    }
    return node_modules_path
}

export const handler = (argv) => {
    log(argv)

    const node_modules_path = findLocalNodeModulesFolder(process.env.INIT_CWD)

    if (argv.u) {
        //initForUser(process.env.ProgramFiles, true)
    }

}