//Core
import chalk from 'chalk'

//Types
// import { IssueParsers, IssueRenderers } from 'types/Plugin'
// import { 
//     Issue, 
//     IssuePriority, 
//     IssueStatus 
//} from 'types/Issue'

//Util
import tell from '../../common/utils/tell.js'
import { conditionalBg, conditionalColor } from '#utils/conditionalChalk.js'

const printIssueID = (id) => {
    tell(chalk.italic.whiteBright(id))
}

const printIssueName = (name) => {
    tell(chalk.yellow.underline.bold(name))
}

const printIssueStatus = (status) => {
    const str = (status ? status.label || status.value : '-')
    
    tell("Status: " + conditionalBg(status?.bgColor)(conditionalColor(status?.color)(str)))
}

const printIssuePriority = (priority) => {
    const str = (priority ? priority.label || priority.value : '-')

    tell("Priority: " + conditionalBg(priority?.bgColor)(conditionalColor(priority?.color)(str)))
}

export default function printIssue(issue, renderers, parsers) {
    printIssueID(issue.metadata.id) //Pluggable
    tell('')
    printIssueName(issue.name) //Pluggable
    tell('')
    printIssueStatus(issue.metadata.status)
    printIssuePriority(issue.metadata.priority)
    tell('')
    renderers.description(issue.description, parsers.description)
}