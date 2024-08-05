// Core
import fs from 'fs';
import _path from 'path';

// Util
import customPathOrDefault from './customPathOrDefault.js';

/**
 * List all issue names in the issues folder and return them as an array
 * 
 * @param { string } [path] (Optional) Custom path to look in. If not specified, 
 * default issues-path from config will be used. 
 * 
 * @returns { string[] } - An array of issue names
 */
export default function listIssues(path) {
    const targetPath = customPathOrDefault(path);

    const files = fs.readdirSync(targetPath);

    return files.filter((file) => _path.extname(file) == '.md').map(file => _path.parse(file).name);
}