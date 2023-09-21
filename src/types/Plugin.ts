import { Issue } from './Issue'

export type SaveIssueToFileFunction = (path: string, issue: Issue) => Promise<void>
export type PrintIssueDescriptionFunction = (description: string) => void

export type PluginFunctions = {
    saveIssueToFile?: SaveIssueToFileFunction
    printIssueDescription?: PrintIssueDescriptionFunction
}

export type PluginModule = PluginFunctions