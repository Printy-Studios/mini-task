import customPathOrDefault from './customPathOrDefault';
import * as fs from 'fs';
import path from 'path';

export default function getIssueRaw(filename, customDir) {
    let target_path = customPathOrDefault(customDir);    
    
    const issue_str = fs.readFileSync(path.join(target_path, filename), { encoding: 'utf-8'});
}