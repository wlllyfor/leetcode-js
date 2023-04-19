/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 * [1,2,3,5,6]
 * 
 *         1
 *       2   3
 *     5  6
 * 
 * 把 path 当成 travel 的参数传递是关键
 */
// var binaryTreePaths = function(root) {
//   let res = []
//   function travel(root, path) {
//     if (!root) {
//       return 
//     }
//     if (!root.left && !root.right) {
//       path += root.val
//       res.push(path)
//     }
//     travel(root.left, path + root.val + '->')
//     travel(root.right, path + root.val + '->')
//   }
//   travel(root, '')
//   return res
// };
function binaryTreePaths (root) {
  let res = []
  function travel(root, paths) {
    if (!root) {
      return 
    }
    if (!root.left && !root.right) {
      paths.push(root.val)
      res.push(paths.join('->'))
    }
    travel(root.left, paths.concat(root.val))
    travel(root.right, paths.concat(root.val))

  }
  travel(root, [])
  return res
}
// @lc code=end

