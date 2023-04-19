/*
 * @lc app=leetcode.cn id=109 lang=javascript
 *
 * [109] 有序链表转换二叉搜索树
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  function travel(left, right) {
    if (left == right) {
      return null
    }
    let mid = findMid(left, right)
    let node = new TreeNode(mid.val)
    node.left = travel(left, mid)
    node.right = travel(mid.next, right)
    return node
  }

  function findMid(left, right) {
    let fast = slow = left
    while (fast !== right && fast.next !== right) {
      fast = fast.next.next
      slow = slow.next
    }
    return slow
  }
  return travel(head, null)
};
// @lc code=end

