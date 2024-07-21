import 'module-alias/register.js';
//Core
import * as yargs from 'yargs'

// Functions
import plugins from 'functions/plugins';
import { loadConfig } from 'constants/config';

function addCommands(_yargs: typeof yargs, commands: any[]) { //Deprecated, use yargs's commandDir instead
    let yargs_commands: yargs.Argv | null = null
    commands.forEach( command => {
        if (!yargs_commands) {
            yargs_commands = _yargs.command(command)
        } else {
            yargs_commands = _yargs.command(command)
        }
        
    })

    return yargs_commands || _yargs
}

const init = async () => {
    // Initialize plugins
    await loadConfig();
    plugins.init();
    await plugins.loadModules();

    
}

const args = yargs  
        .strict()
        .commandDir('../bin_handlers', { exclude: /index.(js|ts)/})//addCommands(yargs, commands).argv
        .parse();

//yargs.middleware(init);



    
