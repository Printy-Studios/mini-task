// Core
import yargs from 'yargs'

// Functions
import plugins from '#functions/plugins.js';

// Commands
import commands from '#bin_handlers/index.js';

// Initialize plugins
await plugins.init();
await plugins.loadModules();


const args = yargs(hideBin(process.argv))
    .strict()
    .command(commands)//addCommands(yargs, commands).argv
    .parse();


    
