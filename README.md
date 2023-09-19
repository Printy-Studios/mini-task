# mini-task
**mini-task** is a file based issue tracker CLI. The intent of this program is to
provide a way for small teams to manage their issues easily, without having to leave
their project environment.

**Features:**

 - **File based** - all issues are stored as human-readable markdown files and
 can be edited/viewed without the CLI
 - **CLI** - the CLI can be used to quickly browse tasks, view, edit, create, delete them.
 - **Lightweight** - mini-task was intended to be light and fast from the very start.
 It offers only the basic functions needed to manage issues. But if you want something more...
 - **...Extensible** - to counter its simplicity, mini-task is designed to be vastly
 extensible

## Commands

`minitask` - Run the CLI

`minitask new [name] --description|d|desc --status|s --priority|p --tags|-t --id` -
Create a new issue. If no name is specified, an interactive issue creator is opened, otherwise
a new issue is created automatically from provided args