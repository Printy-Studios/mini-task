import * as fs from 'fs'
import * as path from 'path'

//Types
import { Issue } from 'types/Issue'

import 'functions/plugins'

export const command = 'new [name]'

type args = Omit<Issue, 'name'> & {
    name?: string,
    id?: string
}

type MinitaskConfig = {
    "issues-path": string
}

const slugify = (str: string) => {
    return str.replace(/\s+/g, '-').toLowerCase();
}

const saveIssueToFile = async (_path: string, issue: Issue) => {

    //String to be written to file
    let output_str = '---\n\n'

    //Add metadata
    for (const field in issue.metadata) {
        output_str += field + ': ' + issue.metadata[field] + '\n'
    }

    output_str += '\n---\n'

    //Add title
    output_str += '### ' + issue.name + '\n'

    //Add description
    output_str += issue.description || ''

    fs.writeFileSync(path.join(_path, issue.metadata.id + '.md'), output_str)
}


/**
 * Find file while traversing up the directory tree
 * @param filename 
 * @param start_dir 
 * @param limit 
 * @returns 
 */
const findFileUp = (filename: string, start_dir: string, limit = 5) => {
    let current_dir = (start_dir || process.env.INIT_CWD)!

    let times_tried = 0

    while(true && times_tried < limit) {
        times_tried++
        var list = fs.readdirSync(current_dir)

        const found = list.indexOf(filename) != -1
        console.log('looking in ' + current_dir)
        if (found) { 
            return {
                str: fs.readFileSync(path.join(current_dir, filename), {encoding: 'utf-8'}),
                path: current_dir
            }
        }
        else {
            current_dir = path.normalize(path.join(current_dir, '..'))
        }
            
    }

    return null
}

const getConfigFromFile = () => {
    const config_file = findFileUp('minitask.json', process.env.INIT_CWD, 5)

    

    if (config_file) {
        const config: MinitaskConfig = JSON.parse(config_file.str)
        config['issues-path'] = path.join(config_file.path, config['issues-path'])
        return config
    } else {
        return null
        //throw new Error('Could not find minitask.json')
    }
}

export const handler = (argv: args) => {
    console.log(argv)

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

    saveIssueToFile(config['issues-path'], new_issue)

    console.log('created new issue!')

}