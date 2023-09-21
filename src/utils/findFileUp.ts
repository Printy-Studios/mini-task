import * as fs from 'fs'
import * as path from 'path'

/**
 * Find file while traversing up the directory tree
 * @param filename 
 * @param start_dir 
 * @param limit 
 * @returns 
 */
export default function findFileUp(filename: string, start_dir: string, return_contents = false, limit = 5, ) {
    let current_dir = (start_dir || process.env.INIT_CWD)!

    let times_tried = 0

    while(true && times_tried < limit) {
        times_tried++
        var list = fs.readdirSync(current_dir)

        const found = list.indexOf(filename) != -1
        console.log('looking in ' + current_dir)
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