function addTwoNumbers(l1, l2) {
  let dummyHead = new ListNode(0); // 创建一个虚拟头节点
  let current = dummyHead; // 当前节点指针
  let carry = 0; // 进位

  while (l1 !== null || l2 !== null) {
    let sum = carry; // 当前位的和等于进位值
    if (l1 !== null) {
      sum += l1.val; // 加上 l1 的当前位的值
      l1 = l1.next; // 移动 l1 指针
    }
    if (l2 !== null) {
      sum += l2.val; // 加上 l2 的当前位的值
      l2 = l2.next; // 移动 l2 指针
    }

    carry = Math.floor(sum / 10); // 计算进位
    current.next = new ListNode(sum % 10); // 创建新节点存储当前位的值
    current = current.next; // 移动当前节点指针
  }

  if (carry > 0) {
    current.next = new ListNode(carry); // 如果最高位有进位，创建新节点存储进位值
  }

  return dummyHead.next; // 返回虚拟头节点的下一个节点，即相加结果的链表
}