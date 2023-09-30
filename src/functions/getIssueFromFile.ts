//Core
import * as fs from 'fs'
import * as path from 'path'
import { Issue } from 'types/Issue'
import * as yamlFront from 'yaml-front-matter'

import getConfigFromFile from './getConfigFromFile'
import log from './log'

export default async function getIssueFromFile(filename: string, custom_dir: string = null) {

    log('Getting issue from file ' + filename)

    let target_path = custom_dir

    //Only load config file if needed, to save resources
    if( !target_path ) {
        log('Target path not specified, getting one from minitask config')
        const config = await getConfigFromFile()

        if (!config) {
            throw new Error('Could not find minitask config')
        }

        target_path = config['issues-path']
        log('Target path: ' + target_path)
    }
    

    
    
    const issue_str = fs.readFileSync(path.join(target_path, filename), { encoding: 'utf-8'})

    const issue_raw_json = yamlFront.safeLoadFront(issue_str, { contentKeyName: 'description'})

    let name:string = (issue_raw_json.description as string).match(/# .*(\r\n|\r|\n)/g)[0]
    name = name.replace(/(\r\n|\r|\n)/, '')

    issue_raw_json.description = issue_raw_json.description.replace(/# .*(\r\n|\r|\n)/, '')

    const issue: Issue = {
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