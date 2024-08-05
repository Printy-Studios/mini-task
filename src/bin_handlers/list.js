import listIssues from '#functions/listIssues.js';
import printIssueList from '#functions/print/printIssueList.js';

export const command = 'list';

export const describe = 'List all tasks';

export const handler = (argv) => {
    const allIssues = listIssues();
    printIssueList(allIssues);
}