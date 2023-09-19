import 'module-alias/register';
//Core
import * as yargs from 'yargs'

//Command handlers
import commands from 'bin_handlers'

function addCommands(_yargs: typeof yargs, commands: any[]) {
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

const args = addCommands(yargs, commands).argv