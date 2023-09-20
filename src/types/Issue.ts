export type Issue = {
    name: string,
    description?: string,
    metadata: IssueMetadata
}

export type IssueMetadata = {
    id: string,
    priority?: number,
    status?: string
}