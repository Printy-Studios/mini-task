# User flows

This document describes the user flows present when using mini-task. The purpose of this document is to have a clear reference during development as to how the features should be implemented

## minitask new

`minitask new` lets the user create a new issue. The command can be passed an optional positional `name` argument and optional flag args such as `--description`, `--tags` etc. If the `name` parameter is specifed, the task gets created directly according to the passed arguments. If the `name` parameter is not specified, an interactive issue creator is launched in the console. After creating the task, it will be output to the console

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
    Select issue:
        create-api-endpoint-movies
        create-docs-folder
        cancel
```

Selecting `cancel` will cancel the action

The interactive editor will be the same as the `create` editor, except the values will be pre-filled and `create` will instead say `update`.

## minitask delete

`minitask delete` allows the user to delete an issue. It has a single required positional argument where you must specify one of the following - `id`|`name`|`description`. If there are multiple issues that match the selector, a selectable list of issues will be shown, just like with `minitask edit`.

After an issue has been selected for deletion, a confirmation prompt will appear for the user to confirm deletion.

## minitask view

`minitask view` allows the user to view a specific issue. Like in `delete`, `edit`, `create`, you can specify a positional argument to select an issue, and a select menu will appear if multiple issues match the selector. The output will print out a formatted issue with markdown rendering support:

```
create-post-handler-movies (id)

Create `POST` handler for the `api/movies` endpoint

We currently have `GET` set up on `api/movies`, but we would like for it to be possible to also add new movies through `POST`...

status: doing
priority: 2
tags: tag1, tag2, tag3, tag4
assignee: JorensM
```

## minitask list

`mintask list` will list all of the project's issues, optionally according to filters/sort. The user can pass args such as `--name="create"` or `--!description="movie"` To filter by those values. The `!` before the arg name means that `NOT` will be applied to the search. The default regex will find matches where the given property cotains the given string, but a custom regex can be passed like so `--!description="/[a-H]/"`.

`--sortby` allows the user to sort by a property, such as `--sortby=status` for descending and `--!sortby=status` for ascending

A user can pass a single positional argument - `preset-name` which will mean that a preset defined in `minitask.json` will be used to filter/sort. It's possible to combine a preset with custom filter/sort options

```
    Issues
    name: create
    description: NOT /[a-J]/
    sort by: status DESC
        create-post-handler-movies
        create-docs-folder
        cancel
```

By default the list is interactive and you can select an issue from the list, which will take you to issue view where you can view and edit the issue. The list can also be run with `--ni` which will output the list in non-interactive mode.