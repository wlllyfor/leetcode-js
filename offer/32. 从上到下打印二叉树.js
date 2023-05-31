function levelOrder(root) {
  let res = [];
  if (!root) {
    return res;
  }
  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    // 定义 curLevel 存储当前一层的数组
    let curLevel = [];
    while (len--) {
      const node = queue.shift();
      // 把当前一层的值存进 curLevel 里
      curLevel.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    // 每一层的数组存进最终的结果里
    res.push(...curLevel);
  }
  return res;
}

// function levelOrder(root) {
//   if (!root) {
//     return [];
//   }

//   const result = [];
//   const queue = [root];

//   while (queue.length) {
//     const levelSize = queue.length;
//     const currentLevel = [];

//     for (let i = 0; i < levelSize; i++) {
//       const node = queue.shift();
//       currentLevel.push(node.val);

//       if (node.left) {
//         queue.push(node.left);
//       }

//       if (node.right) {
//         queue.push(node.right);
//       }
//     }

//     result.push(...currentLevel);
//   }

//   return result;
// }