# Type checking

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

The `typeof` operator is most commonly used to determine the type of data, however, the following consitions often occur when using it.

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

you will find that when using typeof, `null` and `[]` are determined as `'object'`, which obviously does not meet our requirement, let's take a look at the other two methods.

### instanceof

Typeof cannot accurately determine reference types. In this case, the `instanceof` operator can be used, as shown in the following code:

```js
console.log([] instanceof Array); // true

const obj = {};
console.log(obj instanceof Object); // true

const fn = function () {};
console.log(fn instanceof Function); // true

const date = new Date();
console.log(date instanceof Date); // true

const re = /abc/;
console.log(re instanceof RegExp); // true
```

However, the `instanceof` operator is only currect when judging object instances, which means it can not be used to determine primitive type, as shown in the following code:

```js
const str1 = "qwe";
const str2 = new String("qwe");

console.log(str1 instanceof String); // false，unable to determine primitive type。
console.log(str2 instanceof String); // true
```

You may say that this is perfect because `typeof` can determine primitive types, `instanceof` can determine reference types, combine them and we can determine all the data types, and we can solve this challenge.

Don't forget, we alse need to handle `null`, which is quite special. We can directly check if the variable is strictly equal to `null`, as shown in the following code:

```js
function getType(target) {
  // ...
  if (target === null) {
    return "null";
  }
  // ...
}
```

Now, we have the idea, the next step is coding, However, when we actually writing the code, we will realize that it is complex to use the `instanceof` operator to implement the `getType` function, because `instanceof` return `true` or `false`, the `getType` function needs return data type in form of string.

in fact, the `instanceof` operator is originally used to check if the `prototype` property of a constructor appears on the prototype chain of an instance object, it just happens to be usable for type checking, which is why we are discussing it here.However, using it to determine types is not convenient when writing code.

At this point, `Object.prototype.toString` appears. In actual projects, it is commonly used to encapsulate utility functions for type checking.

