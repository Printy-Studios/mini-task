//Core
import * as fs from 'fs'
import * as path from 'path'

//Functions
import log from 'functions/log'
import getConfigFromFile from 'functions/getConfigFromFile'

//Util
import findFileUp from 'utils/findFileUp'

//Types
import { Issue } from 'types/Issue'
import { SaveIssueToFileFunction } from 'types/Plugin'
import { MinitaskConfig } from 'types/Config'

import PluginManager from 'functions/plugins'


const plugins = new PluginManager()


export const command = 'new [name]'

type args = Omit<Issue, 'name'> & {
    name?: string,
    id?: string
}



const slugify = (str: string) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}

const saveIssueToFile: SaveIssueToFileFunction = async (_path: string, issue: Issue) => {

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






export const handler = async (argv: args) => {
    log(argv)

    await plugins.loadModules()

    if (!argv.name) {
        console.log('No name specified, running minitask in interactive mode(TODO)')
        return
    }

    const new_issue: Issue = {
        name: argv.name,
        metadata: {
            id: argv.id || slugify(argv.name)
        }
    }

    const config = getConfigFromFile()

    if (!config) {
        console.log('Could not find minitask.json')
        return
    }

    if (plugins.functions.saveIssueToFile) {
        plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    } else {
        saveIssueToFile(config['issues-path'], new_issue)
    }

    console.log('created new issue!')

}