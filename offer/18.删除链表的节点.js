// 删除链表的节点

function deleteNode(head, val) {
  // 定义虚拟头节点，next 指向原链表头节点。
  let dummy = {
    next: head,
  };

  // 把 dummy 节点赋值给临时节点。
  let tmp = dummy;

  // 还是遍历临时链表，操作临时链表。
  while (tmp && tmp.next) {
    if (tmp.next.val === val) {
      tmp.next = tmp.next.next;
    } else {
      tmp = tmp.next;
    }
  }

  // 最后返回虚拟头节点的 next 节点。
  return dummy.next;
}