//Core
import * as marked from 'marked'
import MDRenderer, { TerminalRendererOptions } from 'marked-terminal'

MDRenderer

//Types
import { Config } from './types/Config'

let config: Config = {

}

function printIssueDescription(description: string) {
    console.log(marked.parse(description))
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
    printIssueDescription,
    setConfig
}