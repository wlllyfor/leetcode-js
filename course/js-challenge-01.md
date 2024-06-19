# Type judgment

## Challenge Introduction

Please implement a function that can accurately return data type in form of string, for example:

| input            | output      |
| ---------------- | ----------- |
| true             | 'boolean'   |
| 100              | 'number'    |
| 'abc'            | 'string'    |
| 100n             | 'bigint'    |
| null             | 'null'      |
| undefined        | 'undefined' |
| Symbol('a')      | 'symbol'    |
| []               | 'array'     |
| {}               | 'object'    |
| function fn() {} | 'function'  |
| new Date()       | 'date'      |
| /abc/            | 'regexp'    |
| new Error()      | 'error'     |
| new Map()        | 'map'       |
| new Set()        | 'set'       |
| new WeakMap()    | 'weakmap'   |
| new WeakSet()    | 'weakset'   |

## Answer

```js
function getType(target) {
  const type = typeof target;
  if (type !== "object") {
    return type;
  }
  return Object.prototype.toString
    .call(target)
    .replace(/^\[object (\S+)\]$/, "$1")
    .toLocaleLowerCase();
}
```

## Explanation

There are several common ways to determine the type of data:

- `typeof`
- `instanceof`
- `Object.prototype.toString.call(xxx)`

### typeof

The `typeof` operator is most commonly used to determine the type of data, however, the following issues often occur when using it.

- unable to determine the `null` type.
- unable to determine reference types other than `function`.

```js
// can determine primitive type other than null
console.log(typeof true); // 'boolean'
console.log(typeof 100); // 'number'
console.log(typeof "abc"); // 'string'
console.log(typeof 100n); // 'bigint'
console.log(typeof undefined); // 'undefined'
console.log(typeof Symbol("a")); // 'symbol'

// unable to determine null
console.log(typeof null); // 'object', the reasons will be explained in the following text

// unable to determine reference types other than function.
console.log(typeof []); // 'object'
console.log(typeof {}); // 'object'
function sayHello() { console.log('hello') };
console.log(typeof sayHello); // 'function'
```


