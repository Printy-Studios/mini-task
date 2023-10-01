/**
 * Wrapper for console.log that should be used when outputting info to the user.
 * Purpose is to differentiate between user-facing output and debug output for easier
 * debug cleanup
 * @param {...any} args stuff to output 
 */
export default function tell(...args: any) {
    console.log(...args)
} 