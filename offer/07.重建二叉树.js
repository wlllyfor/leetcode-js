/**
 * 中左右                                  左中右
 * Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * Output: [3,9,20,null,null,15,7]
 *
 *      3
 *   9    20
 *      15  7
 *
 *     3
 *   9    20
 * 2  1   15  7
 *
 * 3 9 2 1 20 15 7
 *
 * 2 9 1 3 15 20 7
 *
 *
 * 可以使用递归的方式来构建二叉树。
 * 具体来说，我们可以根据前序遍历的第一个节点确定根节点，然后在中序遍历中找到根节点的位置，
 * 根节点左边的节点都是左子树的节点，右边的节点都是右子树的节点。然后递归构建左子树和右子树。
 */

function buildTree(preorder, inorder) {
  if (preorder.length === 0 || inorder.length === 0) {
    return null;
  }
  const rootVal = preorder[0];
  const root = {
    val: rootVal,
    left: null,
    right: null,
  };
  const rootIndex = inorder.indexOf(rootVal);
  const leftInorder = inorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);

  const leftPreorder = preorder.slice(1, rootIndex + 1);
  const rightPreorder = preorder.slice(rootIndex + 1);

  root.left = buildTree(leftPreorder, leftInorder);
  root.right = buildTree(rightPreorder, rightInorder);
  return root;
}

var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  const tree = new TreeNode();
  let current = preorder[0];
  tree.val = current;
  let index = inorder.indexOf(current);
  tree.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index));
  tree.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1));
  return tree;
};

console.log(buildTree(root));
