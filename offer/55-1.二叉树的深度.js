function maxDepth(node, depth = 0) {
  if (!node) {
    return depth;
  }
  const leftDepth = maxDepth(node.left, depth + 1);
  const rightDepth = maxDepth(node.right, depth + 1);
  return Math.max(leftDepth, rightDepth);
}