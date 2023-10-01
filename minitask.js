const chalk = require('chalk');

module.exports = {
    "issues-path": "issues",
    "plugins": {
        "txt-format": true,
        "markdown-renderer": {
            "enabled": true,
            "test-property": 123,
            "heading": chalk.hex('#fcba03')
        }
    }
}