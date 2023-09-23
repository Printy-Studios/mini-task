import { Issue } from './Issue'

export type SaveIssueToFileFunction = (path: string, issue: Issue) => Promise<void>
export type PrintIssueDescriptionFunction = (description: string) => void

export type PluginFunctions = {
    saveIssueToFile?: SaveIssueToFileFunction
    printIssueDescription?: PrintIssueDescriptionFunction
}

export type PluginConstants = {

}

export type PluginMetadata = {
    id: string,
    plugin_path: string,
    enabled: boolean,
    functions?: PluginFunctions
    constants?: PluginConstants
}

export type PluginModule = PluginFunctions | PluginConstants

export type Plugin = {
    module: PluginModule,
    metadata: PluginMetadata
}

export type IssueRenderers = {
    description: (description: string) => void
}