function copyRandomList(head) {
  if (!head) {
    return null;
  }

  // 第一遍遍历，复制每个节点并将其插入到原节点后面
  let curr = head;
  while (curr) {
    const newNode = new Node(curr.val, null, null);
    newNode.next = curr.next;
    curr.next = newNode;
    curr = newNode.next;
  }

  // 第二遍遍历，设置新节点的 random 指针
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // 第三遍遍历，将新节点从原链表中分离出来
  curr = head;
  const newHead = head.next;
  while (curr) {
    const temp = curr.next;
    curr.next = temp.next;
    if (temp.next) {
      temp.next = temp.next.next;
    }
    curr = curr.next;
  }

  return newHead;
}