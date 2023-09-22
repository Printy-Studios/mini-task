import { IssueRenderers } from 'types/Plugin'
import { Issue } from 'types/Issue'
import * as chalk from 'chalk'

const printIssueID = (id: string) => {
    console.log(chalk.italic.whiteBright(id))
}

const printIssueName = (name: string) => {
    console.log(chalk.yellow.underline.bold(name))
}

const printIssueStatus = (status: string) => {

}

const printIssuePriority = (priority: number | string) => {
    
}



export default function printIssue(issue: Issue, renderers: IssueRenderers) {
    printIssueID(issue.metadata.id) //Pluggable
    console.log('')
    printIssueName(issue.name) //Pluggable
    console.log('')
    renderers.description(issue.description)
}