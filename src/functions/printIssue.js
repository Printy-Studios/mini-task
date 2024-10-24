/**
 * Utilities for printing issues
 */

/**
 * @import { 
 *      Issue, 
 *      IssueStatus,
 *      IssuePriority 
 * } from '../types/Issue.js';
 * 
 * @import {
 *      IssueParsers,
 *      IssueRenderers
 * } from '../types/Plugin.js';
 */

//Core
import chalk from 'chalk'

//Util
import tell from '../../common/utils/tell.js'
import { conditionalBg, conditionalColor } from '#utils/conditionalChalk.js'

/**
 * Print issue ID
 * @param { string } id - ID of issue 
 * 
 * @returns { void }
 */
const printIssueID = (id) => {
    tell(chalk.italic.whiteBright(id))
}

/**
 * Print issue name
 * @param { string } name - Name of issue
 * 
 * @returns { void }
 */
const printIssueName = (name) => {
    tell(chalk.yellow.underline.bold(name))
}

/**
 * Print status of issue
 * 
 * @param { IssueStatus } [status] 
 * 
 * @returns { void }
 */
const printIssueStatus = (status) => {
    const str = (status ? status.label || status.value : '-')
    
    tell("Status: " + conditionalBg(status?.bgColor)(conditionalColor(status?.color)(str)))
}

/**
 * Print issue priority
 * 
 * @param { IssuePriority } [priority] 
 * 
 * @returns { void }
 */
const printIssuePriority = (priority) => {
    const str = (priority ? priority.label || priority.value : '-')

    tell("Priority: " + conditionalBg(priority?.bgColor)(conditionalColor(priority?.color)(str)))
}

/**
 * Print issue
 * 
 * @param { Issue } issue - Issue object to print
 * @param { IssueRenderers } renderers - Renderers to use for printing
 * @param { IssueParsers } parsers - Parsers to use for parsing
 * 
 * @returns { void }
 */
export default function printIssue(issue, renderers, parsers) {
    printIssueID(issue.metadata.id) //Pluggable
    tell('')
    printIssueName(issue.name) //Pluggable
    tell('')
    printIssueStatus(issue.metadata.status)
    printIssuePriority(issue.metadata.priority)
    tell('')
    renderers.description(issue.description || "", parsers.description)
}