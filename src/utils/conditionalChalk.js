//Core
import chalk from 'chalk'

export const conditionalChalk = (value, chalkBuilder) => 
    value ? chalkBuilder.call(chalk, value) : chalk
export const conditionalBg = (color) => conditionalChalk<string>(color, chalk.bgHex)
export const conditionalColor = (color) => conditionalChalk<string>(color, chalk.hex)