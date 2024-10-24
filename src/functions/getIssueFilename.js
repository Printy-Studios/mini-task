import customPathOrDefault from './customPathOrDefault.js';
import fs from 'fs';
import path from 'path';

export default function getIssueFilename(issueId, customDir) {
    let target_path = customPathOrDefault(customDir);    

    const filename = issueId + '.md';

    return filename;
}