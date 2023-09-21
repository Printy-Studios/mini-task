import * as path from 'path'

import findFileUp from 'utils/findFileUp'

import { MinitaskConfig } from 'types/Config'

export default function getConfigFromFile() {
    const config_file = findFileUp('minitask.json', process.env.INIT_CWD, true, 5)

    if (config_file) {
        const config: MinitaskConfig = JSON.parse(config_file.str)
        config['issues-path'] = path.join(config_file.path, config['issues-path'])
        return config
    } else {
        return null
        //throw new Error('Could not find minitask.json')
    }
}