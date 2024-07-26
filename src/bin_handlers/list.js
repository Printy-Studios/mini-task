import listIssues from '#functions/listIssues.js';
import printIssueList from '#functions/print/printIssueList.js';

/**
 * List all tasks
 */
export const command = 'list';

export const handler = (argv:) => {
    const allIssues = listIssues();
    printIssueList(allIssues);
}