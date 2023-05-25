function isSymmetric(root) {
  // 边界情况，如果树为空，直接返回true
  if (!root) {
    return true;
  }
  // 递归入口
  return check(root.left, root.right);

  // 辅助函数，专门用来递归
  function check(l, r) {
    // 左右两个节点都为空，说明对称
    if (!l && !r) {
      return true;
    }
    // 一个节点为空，一个节点不为空，说明不对称
    if (!l || !r) {
      return false;
    }
    // 两个节点的值不相等，说明不对称
    if (l.val !== r.val) {
      return false;
    }
    // 递归地处理左子树和右子树
    return check(l.left, r.right) && check(l.right, r.left);
  }
}