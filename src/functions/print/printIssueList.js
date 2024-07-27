import tell from '../../../common/utils/tell.js';

export default function printIssueList(issueNames) {
    for(const issueName of issueNames) {
        tell(issueName);
        //console.log(issueName);
    }
}