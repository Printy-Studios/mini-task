// Core
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

// Functions
import plugins from '#functions/plugins.js';

// Constants
import config, { loadConfig } from '#constants/config.js';

// Commands
import commands from '#bin_handlers/index.js';

// Initialize plugins
await loadConfig();
console.log('config: ', config);
await plugins.init();
await plugins.loadModules();


const args = yargs(hideBin(process.argv))
    .strict()
    .command(commands)//addCommands(yargs, commands).argv
    .parse();


    
