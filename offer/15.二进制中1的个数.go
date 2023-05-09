func hammingWeight(n uint32) int {
	res := 0
	for n != 0 {
		res += int(n % 2)
		n /= 2
	}
	return res
}

func hammingWeight(n uint32) int {
	res := 0
	for n != 0 {
		res++
		n &= (n - 1)
	}
	return res
}