//Core
import chalk from 'chalk'

export const conditionalChalk = <T,>(value: T, chalkBuilder: (value: T) => chalk.Chalk): chalk.Chalk => 
    value ? chalkBuilder.call(chalk, value) : chalk
export const conditionalBg = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.bgHex)
export const conditionalColor = (color: string | undefined | null) => conditionalChalk<string>(color, chalk.hex)