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

## Setup

To use **mini-task**, you first need to install it either **globally** or into your project

**globally**:
```
npm i -g mini-task
```

**project**:
```
npm i mini-task
```

Next, you have to create a new mini-task project. This can be done by running `minitask init` or by creating a `minitask.json` file and populating it with options (see [minitask.json]() for list of options).

`minitask init` will run you through an interactive questionnaire to help you set up your project. If you want to skip the questionnaire and just initialize a project with the default settings, run `minitask init -y`.

Now you have your mini-task project set up, you can start creating issues. See the sections below on how to do that

## Using the CLI

mini-task has two ways how you can use it - with an interactive CLI or through direct commands. If you want to use the interactive CLI, simply run `minitask`, otherwise see the [Commands section](#commands) to see how to run individual commands.

mini-task uses [marked-terminal](https://www.npmjs.com/package/marked-terminal) for rendering the markdown of the issue descriptions. You can alter the style of the rendered markdown through user settings by using `minitask settings` or editing the `minitask-user.json` file.

## Commands

`minitask` - Run the interactive CLI.

`minitask init --y` - Initialize a new mini-task project by answering a few questions. `--y` to skip the questions and initialize with default settings.

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

All issues are stored as Markdown files. This allows an issue to be easily viewed/edited/created without the need for the CLI. Most of the issue's data is stored as [front matter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/?utm_content=cmp-true), except for the title and description. A typical issue file will look something like this:

```
---

status: 'doing'
priority: 2
tags: [ "api", "movies" ]
assignee: "JorensM"

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

mini-task can be extended to support other file formats as well!