//Core
import * as marked from 'marked'
import MDRenderer from 'marked-terminal'

let config = {

}

function parseIssueDescription(description) {
    description = marked.parse(description)

    return description

}

function setConfig(_config) {
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