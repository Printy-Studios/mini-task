# mini-task
**mini-task** is a file based issue tracker CLI. The intent of this program is to
provide a way for small teams to manage their issues easily, without having to leave their project's environment.

**Features:**

 - **File based** - all issues are stored as human-readable markdown files and
 can be edited/viewed without the CLI
 - **CLI** - the CLI can be used to quickly browse tasks, view, edit, create, delete them.
 - **Lightweight** - mini-task was intended to be light and fast from the very start.
 It offers only the basic functions needed to manage issues. But if you want something more...
 - **...Extensible** - to counter its simplicity, mini-task is designed to be vastly
 extensible

## Commands

`minitask` - Run the interactive CLI.

`minitask new [name] --description|d|desc --status|s --priority|p --tags|-t --id` -
Create a new issue. If no name is specified, an interactive issue creator is opened, otherwise
a new issue is created automatically from provided args.

`minitask edit [id|name|description] --name --description --status --priority --tags --id` - 
Edit an existing issue, selecting by either `id`, `name` or `description`. If multiple
issues match the selector, an interface appears where you can select the specific issue.
If you pass any of the optional flags, the issue will be directly updated, otherwise
an interactive editor will be opened.

`minitask delete [id|name|description]` - Delete an existing issue, selecting by
either `id`, `name` or `description`. If multiple issues match the selector, an 
interface appears where you can select the specific issue.

`minitask list [preset-name] --ni --status --priority --tags --id --name --description --sort` - List
issues with the ability to filter and sort. It's possible to create filter/sort presets and default filters/sort in `minitask.json`.

  - `--ni` - don't run command in interactive mode.

`minitask view [id|name|description] --ni` - View issue, selecting by either `id`, `name` or `description`. If multiple issues match the selector, and interface appears where you can select the specific issue.

  - `--ni` - don't run command in interactive mode