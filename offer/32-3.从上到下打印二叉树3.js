function levelOrder(root) {
  if (!root) {
    return [];
  }
  const res = [];
  const queue = [root];
  let level = 0;
  while (queue.length) {
    level++;
    const levelSize = queue.length;
    const levelRes = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelRes.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    if (level % 2 === 0) {
      levelRes.reverse();
    }
    res.push(levelRes);
  }
  return res;
}

