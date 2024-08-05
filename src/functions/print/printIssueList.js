import tell from '../../../common/utils/tell.js';

/**
 * Print a list of issues
 * @param { string[] } issueNames - an array of issue names to print
 * 
 * @returns { void }
 */
export default function printIssueList(issueNames) {
    for(const issueName of issueNames) {
        tell(issueName);
        //console.log(issueName);
    }
}