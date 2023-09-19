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

`minitask new [name] --description|d|desc --status|s --priority|p --tags|-t --id --assignee` -
Create a new issue. If no name is specified, an interactive issue creator is opened, otherwise
a new issue is created automatically from provided args.

`minitask edit [id|name|description] --name --description --status --priority --tags --id --assignee` - 
Edit an existing issue, selecting by either `id`, `name` or `description`. If multiple
issues match the selector, an interface appears where you can select the specific issue.
If you pass any of the optional flags, the issue will be directly updated, otherwise
an interactive editor will be opened.

`minitask delete [id|name|description]` - Delete an existing issue, selecting by
either `id`, `name` or `description`. If multiple issues match the selector, an 
interface appears where you can select the specific issue.

`minitask list [preset-name] --ni --status --priority --tags --id --name --description --assignee --sort` - List
issues with the ability to filter and sort. It's possible to create filter/sort presets and default filters/sort in `minitask.json`.

  - `--ni` - don't run command in interactive mode.

`minitask view [id|name|description] --ni` - View issue, selecting by either `id`, `name` or `description`. If multiple issues match the selector, and interface appears where you can select the specific issue.

  - `--ni` - don't run command in interactive mode.

`minitask settings --e` - Interactively view and edit user settings.

  - `--e` - Open the user settings file (`minitask-user.json`) in default text editor instead of interactive CLI.

## File-based storage

All issues are stored as Markdown files. This allows an issue to be easily viewed/edited/created without the need for the CLI. Most of the issue's data is stored as [front matter](), except for the title and description. A typical issue file will look something like this:

```
---

---

# Create `POST` handler for the `api/movies` endpoint

We currently have `GET` set up on `api/movies`, but we would like for it to be possible to also add new movies through `POST`

## Request format

The request body should have the following properties: 

 - `name`       - *required* - name of the movie
 - `date`       - *required* - release date of the movie
 - `genre`      - *required* - genre of movie
 - `description - *optional* - description of the movie

## Response format

The response should return with the status code appropriate for the outcome of the call, and also return the following data:

 - `message` - the message describing the status of the call, or an error message in case of an error
```

As you can see the file is a regular, readable Markdown file. At the very top you have the front matter that defines the metadata of the issue, also in a human-readable format.

The program can be extended to support other file formats as well!
