/**
 * 1.如果输入的后序遍历序列为空，则返回 true，因为空序列也可以看作是一棵二叉搜索树的后序遍历序列。

 * 2.取出后序遍历序列的最后一个元素作为根节点，然后从序列的开头开始遍历，找到第一个大于等于根节点的元素的位置，这个位置之前的元素都是根节点的左子树，之后的元素都是根节点的右子树。

 * 3.对于右子树中的每个元素，如果它小于根节点，则说明这个序列不是一棵二叉搜索树的后序遍历序列，直接返回 false。

 * 4.对左子树和右子树分别递归调用 verifyPostorder 函数，如果左子树和右子树都是二叉搜索树的后序遍历序列，则整个序列也是二叉搜索树的后序遍历序列，返回 true。
 */
function verifyPostorder(postorder) {
  if (!postorder.length) return true;
  const root = postorder[postorder.length - 1];
  let i = 0;
  while (postorder[i] < root) i++;
  const left = postorder.slice(0, i);
  const right = postorder.slice(i, postorder.length - 1);
  for (let j = 0; j < right.length; j++) {
    if (right[j] < root) return false;
  }
  return verifyPostorder(left) && verifyPostorder(right);
};