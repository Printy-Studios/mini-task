# Tasks

This document describes the tasks that must be done for this project (ironic, isn't it?)

# Todo

# Completed

## ~~Load config during minitask init so that .js config can be used~~

## ~~Deprecate .json config and allow only for .js config - because you can't use chalk in .json (for markdown renderer plugin)~~

## ~~Create `Logger` class and replace `log()` with it~~

## ~~Add `minitask-user.json` section to README~~

## ~~move conditionalChalk to its own file~~

## ~~Add and use 'copyfiles' and 'cleardir' packages for when building the TS~~

## ~~Add 'plugin not specified in `minitask.json`' message~~

## ~~Add plugin information to README.md~~

## ~~Refactor plugin functions for printing to parse and return string instead of having to log to console~~

## ~~Create a 'tell()' function for outputting info to the user(for readability and easier cleanup when cleaning up after console.log debugs)~~

## ~~Markdown renderer plugin styling options~~

## ~~Add support for .js config files~~

## ~~Add plugin config options to `minitask.json`~~

## ~~Add 'unknown setting in `minitask.json` message'~~

## ~~PluginManager - load constants~~

## ~~Add '--ni' to 'list'~~

## ~~Remove '--ni' from 'view'~~

# Cancelled

## ~~Create a nested string property selector > object resolver (*Unneeded due to circumstance change*)~~

~~[See this](https://stackoverflow.com/a/22129960/1673694). This is necessary for the markdown renderer settings where you must pass `chalk`'s properties~~

## ~~Try to make the 'new' command handler extensible (*Marked as too broad*)~~

## ~~`In plugin txt-format: function 0 that is defined in index.json is not being exported in index.js|ts`~~

~~Should say function 'function_name' instead of function 0~~