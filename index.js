module.exports = paramToString;

const THINGS = {
    array (param) {
        const arr = param.map(paramToString);
        return 'array:' + arr.length + ':' + arr.join('') + ';';
    },
    object (param) {
        const keys = Object.keys(param).sort((a, b) => a < b ? -1 : 1);
        const arr = keys.map(key => key + ':' + paramToString(param[key]));
        return 'object:' + arr.length + ':' + arr.join('') + ';';
    },
    date (param) { return 'date:' + param.getTime() + ';'; },
    string (param) { return 'string:' + param.length + ':' + encodeURIComponent(param) + ';'; },
    null () { return 'Null;'; },
    undefined () { return 'Undefined;'; },
    function (param) { return 'function:' + param.name + ':' + encodeURIComponent(param.toString()) + ';'; }
};

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
    'map',
    'set'
];

function paramToString (param) {
    const kind = whatIsIt(param);

    if (THINGS.hasOwnProperty(kind)) return THINGS[kind](param);
    if (ARRAY_TYPES.includes(kind)) return kind + ':' + THINGS.array(Array.from(param));

    try {
        return kind + ':' + encodeURIComponent(param.toString()) + ';';
    } catch (e) {
        return kind + ';';
    }
}

function whatIsIt (param) {
    if (param === null) return 'null';
    if (param === undefined) return 'undefined';
    const kind = /\[object (.*)\]/i.exec(Object.prototype.toString.call(param));
    if (!kind) return 'unknown';
    return kind[1].toLowerCase();
}
