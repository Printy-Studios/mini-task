// Core
import path from 'path';

// Util
import customPathOrDefault from '#functions/customPathOrDefault.js';
import getIssueFilename from '#functions/getIssueFilename.js';
import getIssueFromFile from '#functions/getIssueFromFile.js';
import saveIssueToFile from '#functions/saveIssueToFile.js';
import tell from '../../common/utils/tell.js';


export const command = 'update <selector>';

export const builder = {
    status: {
        default: undefined
    }
}

export const handler = async (argv) => {
    const issueFilename = getIssueFilename(argv.selector);
    const issue = getIssueFromFile(issueFilename);
    issue.metadata.status = argv.status || issue.metadata.status;

    const issuePath = customPathOrDefault();

    saveIssueToFile(issuePath, issue);
    tell('Issue saved');
}
