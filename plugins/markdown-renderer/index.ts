import * as marked from 'marked'
import * as MDRenderer from 'marked-terminal'

marked.setOptions({
    mangle: false,
    headerIds: false,
    renderer: new MDRenderer()
})

function printIssueDescription(description: string) {
    console.log(marked.parse(description))
}

function setConfig(config) {
    console.log('Getting config from Markdown Renderer plugin: ', config)
}

export const functions = {
    printIssueDescription,
    setConfig
}