function serialize(root) {
  if (!root) {
    return '';
  }
  const queue = [root];
  const result = [];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push('#');
    }
  }
  return result.join(',');
}

function deserialize(data) {
  if (!data) {
    return null;
  }
  const values = data.split(',');
  const root = new TreeNode(parseInt(values[0]));
  const queue = [root];
  for (let i = 1; i < values.length; i += 2) {
    const parent = queue.shift();
    if (values[i] !== '#') {
      const left = new TreeNode(parseInt(values[i]));
      parent.left = left;
      queue.push(left);
    }
    if (values[i + 1] !== '#') {
      const right = new TreeNode(parseInt(values[i + 1]));
      parent.right = right;
      queue.push(right);
    }
  }
  return root;
}
