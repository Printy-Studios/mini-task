import * as marked from 'marked'
import * as MDRenderer from 'marked-terminal'

marked.setOptions({
    mangle: false,
    headerIds: false,
    renderer: new MDRenderer()
})

export function printIssueDescription(description: string) {
    console.log(marked.parse(description))
}