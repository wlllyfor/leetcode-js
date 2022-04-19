/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 * 
 * 栈：后入先出  
 * [1,2,3]   push  pop  
 * 结果：3,2,1
 * 
 * 队列：先入先出
 * 
 * [3]   push  shift
 * 
 * [1,2]
 */

// @lc code=start

// var MyStack = function() {
//   this.queue1 = []
//   this.queue2 = []
// };

// /** 
//  * @param {number} x
//  * @return {void}
//  */
// MyStack.prototype.push = function(x) {
//   this.queue1.push(x)
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.pop = function() {
//   if (this.queue1.length === 1) {
//     return this.queue1.shift()
//   }
//   for (let i = 0; i < this.queue1.length - 1; i++) {
//     this.queue2.push(this.queue1.shift())
//   }
//   console.log('this.queue1 :>> ', this.queue1);
//   const res =  this.queue1.shift()
//   this.queue1 = this.queue2
//   this.queue2 = []
//   return res
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.top = function() {
//   return this.queue1.length ? this.queue1[this.queue1.length - 1] : null
// };

// /**
//  * @return {boolean}
//  */
// MyStack.prototype.empty = function() {
//   return !this.queue1.length
// };


/**
 * [1,2,3]
 */
var MyStack = function() {
  this.queue = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue.push(x)
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
  let len = this.queue.length
  let res = len ? this.queue[len - 1] : null
  this.queue = this.queue.slice(0, len - 1)
  return res
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  let len = this.queue.length
  return len ? this.queue[len - 1] : null
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return !this.queue.length
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

