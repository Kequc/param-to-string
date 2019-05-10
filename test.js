const assert = require('assert');
const paramToString = require('./index.js');

async function it (description, cb) {
    try {
        await cb();
        process.stdout.write(description + ' \x1b[32m\u2713\x1b[0m\n');
    } catch (err) {
        process.stdout.write(description + ' \x1b[31m\u2717\x1b[0m\n');
        throw err;
    }
}

it('returns a string', () => {
    assert.strict.equal(typeof paramToString(), 'string');
});

it('knows what an array is', () => {
    assert.strict.equal(paramToString([11, 21]), 'array:number:11;number:21;;');
});

it('knows what an object is', () => {
    assert.strict.equal(paramToString({ foo: 11, bar: 21 }), 'object:bar:number:21;foo:number:11;;');
});

it('knows what a date is', () => {
    assert.strict.equal(paramToString(new Date(1970, 1)), 'date:2674800000;');
});

it('knows what a string is', () => {
    assert.strict.equal(paramToString('hello there'), 'string:hello%20there;');
});

it('knows what null is', () => {
    assert.strict.equal(paramToString(null), 'null;');
});

it('knows what undefined is', () => {
    assert.strict.equal(paramToString(undefined), 'undefined;');
});

it('knows what a function is', () => {
    assert.strict.equal(paramToString(Date.now), 'function:now:function%20now()%20%7B%20%5Bnative%20code%5D%20%7D;');
});

it('knows what a map is', () => {
    const map = new Map();
    map.set('foo', 11);
    map.set('bar', 21);
    assert.strict.equal(paramToString(map), 'map:object:bar:number:21;foo:number:11;;');
});

it('knows what a set is', () => {
    const set = new Set();
    set.add(11);
    set.add(21);
    assert.strict.equal(paramToString(set), 'set:array:number:11;number:21;;');
});

it('knows what a arraybuffer is', () => {
    const arraybuffer = new ArrayBuffer();
    assert.strict.equal(paramToString(arraybuffer), 'arraybuffer:array:;');
});

it('knows what a int16array is', () => {
    const int16array = new Int16Array();
    assert.strict.equal(paramToString(int16array), 'int16array:array:;');
});

it('knows what a nested object is', () => {
    const object = {
        test: {
            foo: 11,
            bar: 21
        },
        hello: 'there'
    };
    assert.strict.equal(paramToString(object), 'object:hello:string:there;test:object:bar:number:21;foo:number:11;;;');
});

it('knows what a nested array is', () => {
    const array = [[11, 21], 'there'];
    assert.strict.equal(paramToString(array), 'array:array:number:11;number:21;;string:there;;');
});

it('knows what a instance is', () => {
    function MyVlog () {
        this.foo = 11;
        this.bar = 21;
    }
    assert.strict.equal(paramToString(new MyVlog()), 'myvlog:object:bar:number:21;foo:number:11;;');
});

it('knows what a class instance is', () => {
    class MyVlog {
        constructor() {
            this.foo = 11;
            this.bar = 21;
        }
    }
    assert.strict.equal(paramToString(new MyVlog()), 'myvlog:object:bar:number:21;foo:number:11;;');
});
