//Core
import chalk from 'chalk'

//Types
import { IssueParsers, IssueRenderers } from 'types/Plugin'
import { 
    Issue, 
    IssuePriority, 
    IssueStatus 
} from 'types/Issue'

//Util
import tell from 'utils/tell'

const conditionalChalk = <T,>(value: T, chalkBuilder: (value: T) => chalk.Chalk): chalk.Chalk => 
    value ? chalkBuilder.call(chalk, value) : chalk
const conditionalBg = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.bgHex)
const conditionalColor = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.hex)

const printIssueID = (id: string) => {
    tell(chalk.italic.whiteBright(id))
}

const printIssueName = (name: string) => {
    tell(chalk.yellow.underline.bold(name))
}

const printIssueStatus = (status: IssueStatus) => {
    const str = (status ? status.label || status.value : '-')
    
    tell("Status: " + conditionalBg(status?.bgColor)(conditionalColor(status?.color)(str)))
}

const printIssuePriority = (priority: IssuePriority) => {
    const str = (priority ? priority.label || priority.value : '-')

    tell("Priority: " + conditionalBg(priority?.bgColor)(conditionalColor(priority?.color)(str)))
}

export default function printIssue(issue: Issue, renderers: IssueRenderers, parsers: IssueParsers) {
    printIssueID(issue.metadata.id) //Pluggable
    tell('')
    printIssueName(issue.name) //Pluggable
    tell('')
    printIssueStatus(issue.metadata.status)
    printIssuePriority(issue.metadata.priority)
    tell('')
    renderers.description(issue.description, parsers.description)
}