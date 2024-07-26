//Functions
import printIssue from '#functions/printIssue.js'
import plugins from '#functions/plugins.js'
import getIssueFromFile from '#functions/getIssueFromFile.js'

import tell from '../../common/utils/tell.js';

const printIssueDescription = (description, parsers) => {
    for(const parser of parsers) {
        description = parser(description)
    }
    tell(description)
}

export const command = 'view <selector>' //Currently only supports ID selector

export const handler = async (argv) => {

    //plugins.loadConstants #TODO

    const issue_file_ext = '.md'//plugins.constants.issue_file_ext #TODO

    const issue = await getIssueFromFile(argv.selector + issue_file_ext) //Update to be able to use selectors other than ID

    const renderers = {
        description: printIssueDescription
    }

    if( plugins.functions.printIssueDescription ) {
        renderers.description = plugins.functions.printIssueDescription
    }

    const parsers = {
        description: plugins.functions.parseIssueDescription
    }

    printIssue(issue, renderers, parsers)

    // if (plugins.functions.saveIssueToFile) {
    //     plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    // } else {
    //     saveIssueToFile(config['issues-path'], new_issue)
    // }
}