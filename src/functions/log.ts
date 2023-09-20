const do_log = true

export default function log(...args) {
    if(do_log) {
        console.log(...args)
    }
}