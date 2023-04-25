class CQueue {
  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  // 入队的逻辑：直接把元素压入 stackIn。
  appendTail(x) {
    this.stackIn.push(x);
  }

  // 出队的逻辑：
  // 元素永远从 stackIn 进，从 stackOut 出。
  deleteHead() {
    // 如果 stackOut 里有元素，直接弹出元素。
    if (this.stackOut.length) {
      return this.stackOut.pop() || -1;
    }

    // 如果 stackIn 里有元素，先把元素挪到 stackOut，再从 stackOut 弹出元素。
    while (this.stackIn.length) {
      this.stackOut.push(this.stackIn.pop());
    }
    return this.stackOut.pop() || -1;
  }
}
