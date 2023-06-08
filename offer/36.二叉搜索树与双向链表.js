function treeToDoublyList(root) {
  if (!root) return null;

  let pre = null;
  let head = null;

  function dfs(cur) {
    if (!cur) return;

    dfs(cur.left);

    if (pre) {
      pre.right = cur;
      cur.left = pre;
    } else {
      head = cur;
    }

    pre = cur;

    dfs(cur.right);
  }

  dfs(root);

  head.left = pre;
  pre.right = head;

  return head;
}