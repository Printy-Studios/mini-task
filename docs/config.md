# Minitask configuration

Minitask's configuration is stored in `minitask.js`. The base configuration is 
project-specific, so each project can have its own configuration, but some of the
options can be globally overriden in the `minitask-user.js` file.

Here's an example configuration file:

```javascript
import chalk from 'chalk';

export default {
    "issues-path": "issues",
    "plugins": {
        "markdown-renderer": {
            "enabled": true,
            "heading": chalk.hex('#fcba03')
        }
    }
}
```

## Options

The following options are available when configuring minitask:

* **issues-path** - *string* - Path to the folder where the issue files will be stored. *Default 'issues'*.
* **plugins** - *object* - An object for plugin configuration. Each key of the object represents the id of the plugin and its value represents the plugin's options. The options will vary depending on the plugin, please see refer to the plugin's documentation for the list of options. But all plugins will have a boolean option **enabled**, to specify whether the plugin should be enabled.