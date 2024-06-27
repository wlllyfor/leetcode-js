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

### Object.prototype.toString.call()

When invoking the `Object.prototype.toString` method, it will uniformly return a string in a format of `[object Xxx]`, which is used to represent the type of the Obejct(the primitive types are wrapper objects).

It should be noted that when calling this method, the `call` method needs to be added(the reason will be explained later), as shown in the following code:

```js
// be attention, we need add .call function behind
// reference types
console.log(Object.prototype.toString.call({})); // '[object Object]'
console.log(Object.prototype.toString.call(function () {})); // "[object Function]'
console.log(Object.prototype.toString.call(/123/g)); // '[object RegExp]'
console.log(Object.prototype.toString.call(new Date())); // '[object Date]'
console.log(Object.prototype.toString.call(new Error())); // '[object Error]'
console.log(Object.prototype.toString.call([])); // '[object Array]'
console.log(Object.prototype.toString.call(new Map())); // '[object Map]'
console.log(Object.prototype.toString.call(new Set())); // '[object Set]'
console.log(Object.prototype.toString.call(new WeakMap())); // '[object WeakMap]'
console.log(Object.prototype.toString.call(new WeakSet())); // '[object WeakSet]'

// primitive types
console.log(Object.prototype.toString.call(1)); // '[object Number]'
console.log(Object.prototype.toString.call("abc")); // '[object String]'
console.log(Object.prototype.toString.call(true)); // '[object Boolean]'
console.log(Object.prototype.toString.call(1n)); // '[object BigInt]'
console.log(Object.prototype.toString.call(null)); // '[object Null]'
console.log(Object.prototype.toString.call(undefined)); // '[object Undefined]'
console.log(Object.prototype.toString.call(Symbol("a"))); // '[object Symbol]'
```

With the above foundation, we can now uniformly invoke `Object.prototype.toString` method to obtain the specific type of data. Then, remove the extra characters and only extract the `Xxx` from `[object Xxx]`.

However, when checking primitive types, it will create extra wrapper objects, to aviod this, we can combine `typeof` to determine primitive types except `null`, so the final code implementation is as follows: 

```js
function getType(target) {
  // use typeof to check first, if it is primitive types, return directly
  const type = typeof target;
  if (type !== "object") {
    return type;
  }

  // if it is a reference type or null, check it as follow, use RegExp, ensuring that the returned type is in lowercase.
  return Object.prototype.toString
    .call(target)
    .replace(/^\[object (\S+)\]$/, "$1")
    .toLocaleLowerCase();
}
```

In the above code, we use `replace` method and regular expressions to extract `Xxx` from `[object Xxx]`, you may be confused about regular expressions, don't worry, we will introduce it in later course and explain how it works.

Actually, we can use another way to solve this challenge, as shown in the following code:

```js
return Object.prototype.toString
  .call(target)
  .match(/\s([a-zA-Z]+)\]$/)[1] // use match is also ok
  .toLocaleLowerCase();
```

Without regular expressions is also ok, we can use anyway as long as we achieve it, as shown in the following code:

 ```js
return Object.prototype.toString
  .call(target)
  .slice(8, -1) // use slice is also ok
  .toLocaleLowerCase();
```

However, personally, I believe the first solving way has the highest readability, so I introduced it first.

With that, the `getType` method is complete, this utility method is very useful. With it, we no more need to write the lengthy type-checking code in business logic. Hurry up and use it in your actual projects and enjoy the benifits it brings.

## Knowledge extension

### Why use call

Answer the question left in the previous text, why is it necessary to write `Object.prototype.toString.call(xxx)` to determine the type of `xxx`?

`call` is a method of function used to change what `this` points to, use the `apply` method is also ok.

If we do not use `call` to change `this` point to our target variable `xxx`, `this` will always point to the called `Object.prototype`, which is the prototype object. When calling the `toString` method on `Object.prototype`, the result will always be `[object Object]`, as shown in the following code:

```js
Object.prototype.toString([]); // do not use call, output '[object Object]', 'this' point to 'Object.prototype', the type is determined as Object.
Object.prototype.toString.call([]); // use call, output '[object Array]', 'this' point to '[]', the type is determined as Array.

Object.prototype.toString(1); // do not use call, output '[object Object]', 'this' point to 'Object.prototype', the type is determined as Object.
Object.prototype.toString.call(1); // use call, output '[object Number]', 'this' point to wrapper object 'Number {1}', the type is determined as Number.
```

We can rewrite the `Object.prototype.toString` method to print out the value of `this` for verification, as shown in the following code:

```js
// rewrite Object.prototype.toString method, only print this
Object.prototype.toString = function () {
  console.log(this);
};
// reference types
Object.prototype.toString([]); // output Object.prototype
Object.prototype.toString.call([]); // output []

// primitive types
Object.prototype.toString(1); // output Object.prototype
Object.prototype.toString.call(1); // output Number {1}, 'Number {1}' is a wrapper object that wraps primitive types with their corresponding reference types, giving them object-like properties.
```

Now you understand why we should use the call method, right? Of course, this is just a brief introduction. If you still doubt about `this` and `call`, don't worry, we will explain it in later course.

In addition, there are some common interview questions about date types summarized at the end of the article, enjoy!

### Common interview question

#### 1.What are the data types in JavaScript?

Answer: The data types of JavaScript are divided into primitive types and reference types.

There are 7 kinds of primitive types, they are:

- [Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
- [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

[reference type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#%E5%AF%B9%E8%B1%A1)(also known as object type) is a general term that includes Array、Object、Funtion and all other objects.

#### 2.What is the result of `typeof null`?

Answer:

```js
typeof null // 'object'
```

As a primitive type, why is `null` recognized as an object type by the `typeof` operator?

In fact, this is a bug left behind by the first verson of JavaScript.

In JavaScript, all data is represented as binary at the underlying level. It is considered as an 'object' type if the first three bits of the binary are 0. While the binary repersentation of `null` is all 0, obviously the first three bits are also 0, so when executing `typeof`, it will return 'object'.

Why did those language design experts allow this bug to exist for so many years?

Because this bug involves too many web systems, once fixed, it will generate more bugs and making many web systems unable to work. Perhaps this bug will never be fixed.

We can write as follows to determine the type `null`, directly check if the variable is strictly equal to `null`.

```js
if (a === null) {
  // do something
}
```

#### 3.What is the difference between primitive type and reference type?

Answer:

| type       | primitive type | reference type |
| ---------- | -------------- | -------------- |
| value      | can not be change | can change  |
| property and method  | can not be added | can be added |
| store      | value       | address(pointer) |
| compare    | compare value | compare address  |

#### 4. What is the difference between `typeof` and `instanceof`?

Answer:

- The `typeof` operator is used to determine the type of data.
- The `instanceof` operator is used to check whether the `prototype` property of a constructor appears on the prototype chain of an instance object. It can also be used to determine the type of data.
  - `typeof` returns a string representing the type of a variable, `instanceof` returns a boolean value.
  - `typeof` can determine primitive types other than `null`, but when it comes to checking reference types, it can only accurately determine the function type, while it can not accurately determine other reference types.
  - `instanceof` can accurately determine all kinds of reference types, but cannot correctly determine primitive types.

