import { Issue } from './Issue'

export type SaveIssueToFileFunction = (path: string, issue: Issue) => Promise<void>

export type PluginFunctions = {
    saveIssueToFile?: SaveIssueToFileFunction
}

export type PluginModule = PluginFunctions