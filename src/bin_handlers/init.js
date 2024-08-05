import * as fs from 'fs';
import * as path from 'path';
import findFileUp from '#utils/findFileUp.js';

import Logger from '#functions/Logger.js';

const logger = new Logger(true, 'Log')

export const command = 'init'

export const describe = 'Initialize minitask by creating a config file and an issues folder';

/**
 * Initialize a minitask directory for user. Minitask directory holds user settings
 * and plugins
 * @param {string}  target_folder path to folder where to initialize minitask folder
 * @param {boolean} overwrite whether to overwrite folder if it already exists
 * 
 * @returns { void }
 */
const initForUser = (target_folder, overwrite = false) => {
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

/**
 * Traverse the directory tree up from a given path until a node_modules folder is found
 * 
 * @param { string } [search_from_path] - path to search from. Defaults to CWD 
 * @returns { string | null } path to the node modules folder or null if node_modules folder was not found
 */
const findLocalNodeModulesFolder = (search_from_path) => {
    if(!search_from_path) search_from_path = process.env.INIT_CWD;
    if(!search_from_path) throw new Error('Path not specified');
    const package_json_path = findFileUp('package.json', search_from_path, false, 5)?.path;
    if(!package_json_path) return null;

    const node_modules_path = path.join(package_json_path, 'node_modules')
    const node_module_folder_exists = fs.existsSync(node_modules_path)
    if (!node_module_folder_exists) {
       return null;// throw new Error(`package.json found at ${package_json_path} but no node_modules folder`)
    }
    return node_modules_path
}

export const handler = (argv) => {
    logger.log(argv, 'data')

    const node_modules_path = findLocalNodeModulesFolder(process.env.INIT_CWD)

    if (argv.u) {
        //initForUser(process.env.ProgramFiles, true)
    }

}