// Core
import fs from 'fs';
import _path from 'path';

// Util
import customPathOrDefault from './customPathOrDefault.js';

/**
 * List all issues in the issues folder
 * @param { string } [path] (Optional) Custom path to look in. If not specified, 
 * default issues-path from config will be used.  
 */
export default function listIssues(path) {
    const targetPath = customPathOrDefault(path);

    const files = fs.readdirSync(targetPath);

    // console.log(files);

    return files.filter((file) => _path.extname(file) == '.md').map(file => _path.parse(file).name);
}