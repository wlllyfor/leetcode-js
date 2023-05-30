// pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
function validateStackSequences(pushed, popped) {
  if (!pushed || !popped || pushed.length !== popped.length) {
    return false;
  }
  const stack = [];
  let i = 0;
  for (const num of pushed) {
    stack.push(num);
    while (stack.length && stack[stack.length - 1] === popped[i]) {
      stack.pop();
      i++;
    }
  }
  return stack.length === 0;
}