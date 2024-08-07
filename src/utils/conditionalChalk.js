//Core
import chalk from 'chalk'

/**
 * @typedef { (value: any) => chalk.Chalk } ChalkBuilder
 */

/**
 * Abstract function for building conditional chalk styling
 * 
 * @param { any } value - Value to pass to the chalk builder. If value is falsy,
 * builder will be skipped, otherwise it will be invoked 
 * @param { ChalkBuilder } chalkBuilder 
 * 
 * @returns { ChalkBuilder }
 */
export const conditionalChalk = (value, chalkBuilder) => 
    value ? chalkBuilder.call(chalk, value) : chalk

/*
 * Builder functions for constructing a conditional chalk style
 */

export const conditionalBg = (color) => conditionalChalk(color, chalk.bgHex)
export const conditionalColor = (color) => conditionalChalk(color, chalk.hex)