import 'module-alias/register';
//Core
import * as yargs from 'yargs'

// Functions
import plugins from 'functions/plugins';

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

// Initialize plugins
await plugins.init();
await plugins.loadModules();

const args = yargs
    .strict()
    .commandDir('../bin_handlers', { exclude: /index.(js|ts)/})//addCommands(yargs, commands).argv
    .parse();


    
