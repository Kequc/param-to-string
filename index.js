module.exports = paramToString;

const ARRAY_TYPES = [
    'uint8array',
    'uint8clampedarray',
    'int8array',
    'uint16array',
    'int16array',
    'uint32array',
    'int32array',
    'float32array',
    'float64array',
    'arraybuffer',
    'set',
    'weakset'
];

const OBJECT_TYPES = [
    'map',
    'weakmap'
];

function paramToString (param) {
    const kind = whatIsIt(param);

    switch (kind) {
    case 'array': return renderArray(param) + ';';
    case 'object': return renderObject(param, true) + ';';
    case 'date': return 'date:' + param.getTime() + ';';
    case 'function': return 'function:' + param.name + ':' + stringify(param) + ';';
    }

    if (ARRAY_TYPES.includes(kind)) return kind + ':' + renderArray(Array.from(param)) + ';';
    if (OBJECT_TYPES.includes(kind)) return kind + ':' + renderObject(objectFrom(param)) + ';';

    try {
        return kind + ':' + stringify(param) + ';';
    } catch (e) {
        return kind + ';';
    }
}

function renderArray (param) {
    const constructor = param.constructor.name.toLowerCase();
    const values = param.map(paramToString);
    const arr = ['array', values.join('')];
    if (constructor !== 'array') arr.unshift(constructor);
    return arr.join(':');
}

function renderObject (param, sortKeys = false) {
    const constructor = param.constructor.name.toLowerCase();
    const keys = Object.keys(param);
    if (sortKeys) keys.sort((a, b) => a < b ? -1 : 1);
    const values = keys.map(key => key + ':' + paramToString(param[key]));
    const arr = ['object', values.join('')];
    if (constructor !== 'object') arr.unshift(constructor);
    return arr.join(':');
}

function objectFrom (param) {
    const result = {};
    for (const [key, value] of param.entries()) {
        result[key] = value;
    }
    return result;
}

function whatIsIt (param) {
    if (param === null) return 'null';
    if (param === undefined) return 'undefined';
    const kind = /\[object (.*)\]/i.exec(Object.prototype.toString.call(param));
    if (!kind) return 'unknown';
    return kind[1].toLowerCase();
}

function stringify(param) {
    return encodeURIComponent(param.toString());
}
