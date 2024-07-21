//Core
import * as yargs from 'yargs'

// Functions
import plugins from '#functions/plugins.js';

// Initialize plugins
await plugins.init();
await plugins.loadModules();

const args = yargs
    .strict()
    .commandDir('../bin_handlers', { exclude: /index.(js|ts)/})//addCommands(yargs, commands).argv
    .parse();


    
