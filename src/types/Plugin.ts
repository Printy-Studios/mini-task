import { Issue } from './Issue'

export type SaveIssueToFileFunction = (path: string, issue: Issue) => Promise<void>
export type PrintIssueDescriptionFunction = (description: string) => void
export type setConfigFunction = (config: any) => void

export type PluginFunctions = {
    saveIssueToFile?: SaveIssueToFileFunction
    printIssueDescription?: PrintIssueDescriptionFunction
    setConfig?: setConfigFunction
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

export type PluginExport = PluginFunctions | PluginConstants

export type PluginModule = {
    constants?: PluginConstants,
    functions?: PluginFunctions
}

export type Plugin = {
    module: PluginModule,
    metadata: PluginMetadata
}

export type IssueRenderers = {
    description: (description: string) => void
}