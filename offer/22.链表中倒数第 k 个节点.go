type ListNode struct {
	Val  int
	Next *ListNode
}

func getKthFromEnd(head *ListNode, k int) *ListNode {
	fast := head
	slow := head
	for i := 0; i < k; i++ {
		if fast == nil {
			return nil // 如果链表长度小于 k，返回 nil
		}
		fast = fast.Next
	}
	for fast != nil {
		fast = fast.Next
		slow = slow.Next
	}
	return slow
}