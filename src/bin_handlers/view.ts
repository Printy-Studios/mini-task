//Functions
import printIssue from 'functions/printIssue'
import PluginManager from 'functions/plugins'
import getIssueFromFile from 'functions/getIssueFromFile'

//Types
import { IssueRenderers } from 'types/Plugin'
import tell from 'utils/tell'

const printIssueDescription = (description: string) => {
    tell(description)
}

export const command = 'view [selector]' //Currently only supports ID selector

type Args = {
    selector: string
}

export const handler = async (argv: Args) => {

    const plugins = new PluginManager()

    await plugins.init()
    await plugins.loadModules()

    //plugins.loadConstants #TODO

    const issue_file_ext = '.md'//plugins.constants.issue_file_ext #TODO

    const issue = await getIssueFromFile(argv.selector + issue_file_ext) //Update to be able to use selectors other than ID

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