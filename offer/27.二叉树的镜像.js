function mirrorTree(root) {
  if (!root) {
    return null;
  }
  [root.left, root.right] = [mirrorTree(root.right), mirrorTree(root.left)];
  return root;
}