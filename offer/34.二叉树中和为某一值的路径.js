function pathSum(root, targetSum) {
  const result = [];

  function dfs(node, sum, path) {
    if (!node) {
      return;
    }

    path.push(node.val);
    sum += node.val;

    if (!node.left && !node.right && sum === targetSum) {
      result.push([...path]);
    }

    dfs(node.left, sum, path);
    dfs(node.right, sum, path);

    path.pop();
  }

  dfs(root, 0, []);

  return result;
}
