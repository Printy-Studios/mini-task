//Core
import * as fs from 'fs'
import * as path from 'path'
import { Issue } from 'types/Issue'
import * as yamlFront from 'yaml-front-matter'

import getConfigFromFile from './getConfigFromFile'

export default function getIssueFromFile(filename: string, custom_dir: string = null) {

    let target_path = custom_dir

    //Only load config file if needed to save resources
    if( !target_path ) {
        const config = getConfigFromFile()

        if (!config) {
            console.log('Could not find minitask.json')
            return
        }

        target_path = custom_dir || config['issues-path']
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