// [1, 2, 3, 4, 5]
// 1 -> null
var reverseList = function(head) {
  let res = null
  while(head){
      res = {
          val: head.val,
          next: res
      }
      head = head.next
  }

  return res
};