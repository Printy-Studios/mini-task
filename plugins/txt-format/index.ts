import * as fs from 'fs'
import * as path from 'path'

import { Issue } from 'types/Issue'

async function saveIssueToFile (_path: string, issue: Issue) {

    //String to be written to file
    let output_str = 'My custom file format!\n'
    output_str += '===\n'

    //Add metadata
    for (const field in issue.metadata) {
        output_str += field + ': ' + issue.metadata[field] + '\n'
    }

    output_str += '\n===\n\n'

    //Add title
    output_str += issue.name.toUpperCase() + '\n'

    //Add description
    output_str += issue.description || ''

    fs.writeFileSync(path.join(_path, issue.metadata.id + '.txt'), output_str)
}

const issue_file_ext = 'txt'

export const functions = {
    saveIssueToFile
}

export const constants = {
    issue_file_ext
}