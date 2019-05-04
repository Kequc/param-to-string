# param-to-string

Generates a unique string from a parameter.

## Warning

I cannot say this library will not change. Please only use this for short term hashing purposes, or lock the version you are using of this library.

## Usage

Given a parameter in javascript if we wanted to hash it we would first need to convert it into a string, that's what this library aims to do. It will create a hashable string from just about anything.

```javascript
const paramToString = require('param-to-string');

paramToString('hello there');
// string:hello%20there;
```

We can create a string from arrays, objects and more.

```javascript
const paramToString = require('param-to-string');

paramToString([11, 21, 'hello there']);
// array:number:11;number:21;string:hello%20there;;
```

## Special cases

### array

`'array:{paramToString(param[index])};{...etc};;'`

### object

Object keys are sorted alphabetically.

`'object:{key}:{paramToString(param[key])};{...etc};;'`

### date

`'date:{utc(param)};'`

### null

`'null;'`

### undefined

`'undefined;'`

### function

`'function:{param.name}:{escape(stringify(param))};'`

## Array cases

The following types are converted into an array prepended with their actual type. `['uint8array', 'uint8clampedarray', 'int8array', 'uint16array', 'int16array', 'uint32array', 'int32array', 'float32array', 'float64array', 'arraybuffer', 'set', 'weakset']` In the following format.

`'type(param):array:{...etc};;'`

## Object cases

The following types are converted into an object prepended with their actual type. `['map', 'weakmap']` In the following format.

`'type(param):object:{...etc};;'`

## Nesting

You can nest arrays and objects.

## General case

`'{type(param)}:{escape(stringify(param))};'`

## Contribute

Sure!
