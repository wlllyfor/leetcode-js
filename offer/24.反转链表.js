// [1, 2, 3, 4, 5]
// 1 -> null
function reverseList(head) {
  // 定义前驱指针 pre，初始值为 null。
  let pre = null;

  // 遍历链表。
  while (head) {
    // next 指针用来暂存当前节点的下一个节点，在反转完了之后使用。
    let next = head.next;

    // 当前节点指向前驱节点 pre，实现反转。
    head.next = pre;

    // 反转后，pre 后移一位，当前节点 head 也后移一位。
    pre = head;
    head = next;
  }

  // 最后，返回 pre。
  return pre;
}