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
```

The items can be navigated by arrow keys, and by pressing `ENTER` on any of the items, the user will be prompted to set the value for that item. `tags`, `status`, `priority`, `assignee` will offer a selectable list from the default values specified in `mini-task.json`