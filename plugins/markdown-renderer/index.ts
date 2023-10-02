//Core
import * as marked from 'marked'
import MDRenderer, { TerminalRendererOptions } from 'marked-terminal'

MDRenderer

//Types
import { Config } from './types/Config'

let config: Config = {

}

function parseIssueDescription(description: string) {
    description = marked.parse(description)

    return description

}

function setConfig(_config: Config) {
    console.log('Getting config from Markdown Renderer plugin: ', config)
    marked.setOptions({
        mangle: false,
        headerIds: false,
        renderer: new MDRenderer(
            _config
        )
    })
}

export const functions = {
    parseIssueDescription,
    setConfig
}