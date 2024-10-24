/** @import { Issue } from './../types/Issue' */

import fs from 'fs';
import path from 'path';


/**
 * Save an issue to a file
 * 
 * @param { string } _path - Full path to folder where file should be saved 
 * @param { Issue } issue - The issue object to parse and save.
 * 
 * @returns { void }
 */
const saveIssueToFile = (_path, issue) => {

    //String to be written to file
    let output_str = '---\n\n'

    //Add metadata
    for (const field in issue.metadata) {
        output_str += field + ': ' + issue.metadata[field] + '\n'
    }

    output_str += '\n---\n\n'

    //Add title
    output_str += '# ' + issue.name + '\n\n'

    //Add description
    output_str += issue.description || ''

    fs.writeFileSync(path.join(_path, issue.metadata.id + '.md'), output_str)
}

export default saveIssueToFile;