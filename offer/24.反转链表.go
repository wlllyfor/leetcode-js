func reverseList(head *ListNode) *ListNode {
	var pre *ListNode
	for head != nil {
		head.Next, pre, head = pre, head, head.Next
	}
	return pre
}