import { Issue } from 'types/Issue'
import * as chalk from 'chalk'

type IssueRenderers = {
    description: (description: string) => void
}

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