import * as fs from 'fs'
import * as path from 'path'

/**
 * Find file while traversing up the directory tree from a given path
 * 
 * @param { string } filename - filename to look for
 * @param { string } start_dir - path from which to start the traversal
 * @param { boolean } [return_contents = false] - whether to also return the contents of the file
 * @param { number} [limit = 5] - the limit of how many levels to traverse upwards 
 * 
 * @returns { { str: string | null, path: string } | null } - An object representing 
 * the full path and contents (if return_contents == true) of the file or null if file was not found
 */
export default function findFileUp(filename, start_dir, return_contents = false, limit = 5) {
    let current_dir = start_dir || process.env.INIT_CWD;

    if(!current_dir) {
        throw new Error('starting path not specified');
    }

    let times_tried = 0

    while(times_tried < limit) {
        times_tried++
        var list = fs.readdirSync(current_dir)

        const found = list.indexOf(filename) != -1
        if (found) { 
            return {
                str: return_contents ? fs.readFileSync(path.join(current_dir, filename), {encoding: 'utf-8'}) : null,
                path: current_dir
            }
        }
        else {
            current_dir = path.normalize(path.join(current_dir, '..'))
        }
            
    }

    return null
}