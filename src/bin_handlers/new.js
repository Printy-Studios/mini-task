//Core
import * as fs from 'fs'
import * as path from 'path'

//Functions
import Logger from '#functions/Logger.js'
import getConfigFromFile from '#functions/getConfigFromFile.js'
import plugins from '#functions/plugins.js'

import tell from '../../common/utils/tell.js'

const logger = new Logger(true, 'Log')

export const command = 'new [name]';

const slugify = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}

const saveIssueToFile = async (_path, issue) => {

    //String to be written to file
    let output_str = '---\n\n'

    //Add metadata
    for (const field in issue.metadata) {
        output_str += field + ': ' + issue.metadata[field] + '\n'
    }

    output_str += '\n---\n\n'

    //Add title
    output_str += '# ' + issue.name + '\n'

    //Add description
    output_str += issue.description || ''

    fs.writeFileSync(path.join(_path, issue.metadata.id + '.md'), output_str)
}






export const handler = async (argv) => {
    logger.log(argv, 'data')

    if (!argv.name) {
        tell('No name specified, running minitask in interactive mode(TODO)')
        return
    }

    const new_issue = {
        name: argv.name,
        metadata: {
            id: argv.id || slugify(argv.name)
        }
    }

    if (!config) {
        tell('Could not find minitask.json')
        return
    }

    if (plugins.functions.saveIssueToFile) {
        plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    } else {
        saveIssueToFile(config['issues-path'], new_issue)
    }

    tell('created new issue!')

}