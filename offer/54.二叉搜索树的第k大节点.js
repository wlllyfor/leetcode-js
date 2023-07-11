function kthLargest(root, k) {
  const values = [];

  function inorderTraversal(node) {
    if (!node) return;
    inorderTraversal(node.left);
    values.push(node.val);
    inorderTraversal(node.right);
  }

  inorderTraversal(root);

  return values[values.length - k];
}