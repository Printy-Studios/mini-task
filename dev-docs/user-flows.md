# User flows

This document describes the user flows present when using mini-task. The purpose of this document is to have a clear reference during development as to how the features should be implemented

## minitask new

`minitask new` lets the user create a new issue. The command can be passed an optional positional `name` argument and optional flag args such as `--description`, `--tags` etc. If the `name` parameter is specifed, the task gets created directly according to the passed arguments. If the `name` parameter is not specified, an interactive issue creator is launched in the console.

### Interactive issue creator

The interactive issue creator will output the following selectable list:

```
    name: 
    description: 
    tags:
    status:
    priority:
    assignee:
    id:
    create
    cancel
```

The items can be navigated by arrow keys, and by pressing `ENTER` on any of the items, the user will be prompted to set the value for that item. `tags`, `status`, `assignee` will offer a selectable list from the default values specified in `mini-task.json`. Selecting `create` will create the issue and output it in the console. Selecting `cancel` will cancel issue creation (the `cancel` option will only be shown in the interactive CLI, not when running the command directly)

## minitask edit

`minitask edit` will be similar to `minitask new`. You can pass flag args to directly update the issue, or only include the positional argument (`id`|`name`|`description`) to open the interactive editor. If multiple issues match the selector, the user will be prompted with a list to select the right issue:

```
    Issues:
        create-api-endpoint-movies
        update-docs
        
```

The interactive editor will be the same as the `create` editor, except the values will be pre-filled and `create` will instead say `update`.

