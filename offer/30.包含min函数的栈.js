class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [Infinity];
  }

  push(x) {
    this.stack.push(x);
    this.minStack.push(Math.min(this.minStack[this.minStack.length - 1], x));
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  min() {
    return this.minStack[this.minStack.length - 1];
  }
}
