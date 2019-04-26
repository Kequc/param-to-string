const assert = require('assert');
const paramToString = require('./param-to-string.js');

async function it (description, cb) {
    try {
        await cb();
        process.stdout.write(description + ' \x1b[32m\u2713\x1b[0m\n');
    } catch (err) {
        process.stdout.write(description + ' \x1b[31m\u2717\x1b[0m\n');
        throw err;
    }
}
