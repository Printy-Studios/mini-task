import listIssues from 'functions/listIssues';
import printIssueList from 'functions/print/printIssueList';

/**
 * List all tasks
 */
export const command = 'list';

type Args = {

}

export const handler = (argv: Args) => {
    const allIssues = listIssues();
    printIssueList(allIssues);
}