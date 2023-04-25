type CQueue struct {
	stackIn  []int
	stackOut []int
}

func Constructor() CQueue {
	return CQueue{
		stackIn:  []int{},
		stackOut: []int{},
	}
}

func (q *CQueue) AppendTail(x int) {
	q.stackIn = append(q.stackIn, x)
}

func (q *CQueue) DeleteHead() int {
	if len(q.stackOut) > 0 {
		x := q.stackOut[len(q.stackOut)-1]
		q.stackOut = q.stackOut[:len(q.stackOut)-1]
		return x
	}

	for len(q.stackIn) > 0 {
		x := q.stackIn[len(q.stackIn)-1]
		q.stackIn = q.stackIn[:len(q.stackIn)-1]
		q.stackOut = append(q.stackOut, x)
	}

	if len(q.stackOut) > 0 {
		x := q.stackOut[len(q.stackOut)-1]
		q.stackOut = q.stackOut[:len(q.stackOut)-1]
		return x
	}

	return -1
}