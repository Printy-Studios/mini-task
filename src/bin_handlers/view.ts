//Core
import yamlFront from 'yaml-front-matter'

//Functions
import getConfigFromFile from 'functions/getConfigFromFile'
import printIssue from 'functions/printIssue'
import PluginManager from 'functions/plugins'
import getIssueFromFile from 'functions/getIssueFromFile'

//Types
import { IssueRenderers } from 'types/Plugin'

const printIssueDescription = (description: string) => {
    console.log(description)
}

export const command = 'view [selector]' //Currently only supports ID selector

type Args = {
    selector: string
}

export const handler = async (argv: Args) => {

    const plugins = new PluginManager()

    await plugins.loadFunctions()

    //plugins.loadConstants #TODO

    const issue_file_ext = '.md'//plugins.constants.issue_file_ext #TODO

    const issue = getIssueFromFile(argv.selector + issue_file_ext) //Update to be able to use selectors other than ID

    console.log(issue)


    const renderers: IssueRenderers = {
        description: printIssueDescription
    }

    if( plugins.functions.printIssueDescription ) {
        renderers.description = plugins.functions.printIssueDescription
    }

    printIssue(issue, renderers)

    // if (plugins.functions.saveIssueToFile) {
    //     plugins.functions.saveIssueToFile(config['issues-path'], new_issue)
    // } else {
    //     saveIssueToFile(config['issues-path'], new_issue)
    // }
}