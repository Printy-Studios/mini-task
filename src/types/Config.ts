export type MinitaskConfigPlugin = boolean | {
    enabled: boolean,
    config: object
}

export type MinitaskConfigPlugins = {
    [plugin_name: string]: MinitaskConfigPlugin
}

export type MinitaskConfig = {
    "issues-path": string
    "plugins": MinitaskConfigPlugins
}