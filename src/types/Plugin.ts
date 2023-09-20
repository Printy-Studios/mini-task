import { Issue } from './Issue'

export type SaveIssueToFileFunction = (path: string, issue: Issue) => void

export type PluginFunctions = {
    saveIssueToFile?: SaveIssueToFileFunction
}

export type PluginModule = PluginFunctions