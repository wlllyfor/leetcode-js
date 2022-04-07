/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @param {ListNode} head
 * @return {boolean}
 * 
 *  i     j
 * [1,2,2,1]
 */
// var isPalindrome = function(head) {
//   let arr = []
//   while(head) {
//     arr.push(head.val)
//     head = head.next
//   }
//   let l = 0, r = arr.length - 1
//   while(l < r) {
//     if (arr[l] !== arr[r]) {
//       return false
//     }
//     l++
//     r--
//   }
//   return true
// };

// function isPalindrome(head) {
//   let str = ''
//   while(head) {
//     str += head.val
//     head = head.next
//   }
//   console.log(str)
//   return str.split('').reverse().join('') === str
// }

function isPalindrome(head) {
  let pre = null
  let fast = slow = head

  while(fast && fast.next) {
    fast = fast.next.next
    let next = slow.next
    slow.next = pre
    pre = slow
    slow = next
  }

  if (fast) {
    slow = slow.next
  }

  while(pre && slow) {
    if (pre.val !== slow.val) {
      return false
    }
    pre = pre.next
    slow = slow.next
  }
  return true
  
}
// @lc code=end

