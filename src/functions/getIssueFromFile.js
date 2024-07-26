//Core
import * as fs from 'fs'
import * as path from 'path'
import yamlFront from 'yaml-front-matter'

import Logger from './Logger.js'
import customPathOrDefault from './customPathOrDefault.js'

const logger = new Logger(true, 'Log')

/**
 * Parse issue from given file
 * 
 * @param filename file name of issue
 * @param { string } [custom_dir]  (optional) custom directory. If not specified, issues-path specified in config is used
 * 
 * @returns { Issue } 
 */
export default async function getIssueFromFile(filename, custom_dir) {

    logger.log('Getting issue from file ' + filename)

    let target_path = await customPathOrDefault(custom_dir);    
    
    const issue_str = fs.readFileSync(path.join(target_path, filename), { encoding: 'utf-8'})

    const issue_raw_json = yamlFront.safeLoadFront(issue_str, { contentKeyName: 'description'})

    let name = (issue_raw_json.description).match(/# .*(\r\n|\r|\n)/g)[0]
    name = name.replace(/(\r\n|\r|\n)/, '')

    issue_raw_json.description = issue_raw_json.description.replace(/# .*(\r\n|\r|\n)/, '')

    const issue = {
        name: name,
        description: issue_raw_json.description,
        metadata: {
            id: issue_raw_json.id,
            priority: issue_raw_json.priority,
            status: issue_raw_json.status
        }
    }

    return issue
}