// function printNumbers (n) {
//   let max = Math.pow(10, n) - 1;
//   let res = [];
//   for (let i = 1; i <= max; i++) {
//     res.push(i);
//   }
//   return res;
// };

func printNumbers(n int) []int {
	max := int(math.Pow10(n)) - 1
	res := make([]int, max)
	for i := 1; i <= max; i++ {
		res[i-1] = i
	}
	return res
}
