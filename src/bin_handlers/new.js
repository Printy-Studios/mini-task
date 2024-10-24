/** @import { Issue } from '../types/Issue' */

//Core
import * as fs from 'fs'
import * as path from 'path'

//Functions
import Logger from '#functions/Logger.js'
import plugins from '#functions/plugins.js'

//Utils
import tell from '../../common/utils/tell.js'
import saveIssueToFile from '#functions/saveIssueToFile.js'

//Constants
import config from '#constants/config.js'

const logger = new Logger(true, 'Log')

export const command = 'new <name> [description]';

export const describe = 'Create a new task';

/**
 * Convert a given string to its slug representation
 * 
 * @param { string } str - string to convert
 * @returns { string } slugified string
 */
const slugify = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}

export const handler = async (argv) => {
    logger.log(argv, 'data')

    if (!argv.name) {
        tell('No name specified, running minitask in interactive mode(TODO)')
        return
    }

    const new_issue = {
        name: argv.name,
        description: argv.description,
        metadata: {
            id: argv.id || slugify(argv.name)
        }
    }

    if (!config) {
        tell('Could not find minitask config file')
        return
    }

    // If there is a custom save function from a plugin, use it instead.
    if (plugins.functions.saveIssueToFile) {
        plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    } else {
        saveIssueToFile(config['issues-path'], new_issue)
    }

    tell('created new issue!')

}