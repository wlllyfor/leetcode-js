function isBalanced(root) {
  if (!root) {
    return true;
  }
  
  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);
  
  if (Math.abs(leftDepth - rightDepth) > 1) {
    return false;
  }
  
  return isBalanced(root.left) && isBalanced(root.right);
}

function getDepth(node) {
  if (!node) {
    return 0;
  }
  
  const leftDepth = getDepth(node.left);
  const rightDepth = getDepth(node.right);
  
  return Math.max(leftDepth, rightDepth) + 1;
}