// package main

// import "fmt"

// func main() {

// 	var a int = 21
// 	var b int = 10
// 	var c int

// 	c = a + b
// 	fmt.Printf("第一行 - c 的值为 %d\n", c)
// 	c = a - b
// 	fmt.Printf("第二行 - c 的值为 %d\n", c)
// 	c = a * b
// 	fmt.Printf("第三行 - c 的值为 %d\n", c)
// 	c = a / b
// 	fmt.Printf("第四行 - c 的值为 %d\n", c)
// 	c = a % b
// 	fmt.Printf("第五行 - c 的值为 %d\n", c)
// 	a++
// 	fmt.Printf("第六行 - a 的值为 %d\n", a)
// 	a = 21 // 为了方便测试，a 这里重新赋值为 21
// 	a--
// 	fmt.Printf("第七行 - a 的值为 %d\n", a)
// }

// package main

// import "fmt"

// func main() {
// 	var a int = 21
// 	var b int = 10

// 	if a == b {
// 		fmt.Printf("第一行 - a 等于 b\n")
// 	} else {
// 		fmt.Printf("第一行 - a 不等于 b\n")
// 	}
// 	if a < b {
// 		fmt.Printf("第二行 - a 小于 b\n")
// 	} else {
// 		fmt.Printf("第二行 - a 不小于 b\n")
// 	}

// 	if a > b {
// 		fmt.Printf("第三行 - a 大于 b\n")
// 	} else {
// 		fmt.Printf("第三行 - a 不大于 b\n")
// 	}
// 	/* Lets change value of a and b */
// 	a = 5
// 	b = 20
// 	if a <= b {
// 		fmt.Printf("第四行 - a 小于等于 b\n")
// 	}
// 	if b >= a {
// 		fmt.Printf("第五行 - b 大于等于 a\n")
// 	}
// }

// package main

// import "fmt"

// func main() {
// 	var a bool = true
// 	var b bool = false
// 	if a && b {
// 		fmt.Printf("第一行 - 条件为 true\n")
// 	}
// 	if a || b {
// 		fmt.Printf("第二行 - 条件为 true\n")
// 	}
// 	/* 修改 a 和 b 的值 */
// 	a = false
// 	b = true
// 	if a && b {
// 		fmt.Printf("第三行 - 条件为 true\n")
// 	} else {
// 		fmt.Printf("第三行 - 条件为 false\n")
// 	}
// 	if !(a && b) {
// 		fmt.Printf("第四行 - 条件为 true\n")
// 	}
// }

package main

import "fmt"

func main() {
	var a int = 21
	var c int

	c = a
	fmt.Printf("第 1 行 - =  运算符实例，c 值为 = %d\n", c)

	c += a
	fmt.Printf("第 2 行 - += 运算符实例，c 值为 = %d\n", c)

	c -= a
	fmt.Printf("第 3 行 - -= 运算符实例，c 值为 = %d\n", c)

	c *= a
	fmt.Printf("第 4 行 - *= 运算符实例，c 值为 = %d\n", c)

	c /= a
	fmt.Printf("第 5 行 - /= 运算符实例，c 值为 = %d\n", c)

	c = 200

	c <<= 2
	fmt.Printf("第 6行  - <<= 运算符实例，c 值为 = %d\n", c)

	c >>= 2
	fmt.Printf("第 7 行 - >>= 运算符实例，c 值为 = %d\n", c)

	c &= 2
	fmt.Printf("第 8 行 - &= 运算符实例，c 值为 = %d\n", c)

	c ^= 2
	fmt.Printf("第 9 行 - ^= 运算符实例，c 值为 = %d\n", c)

	c |= 2
	fmt.Printf("第 10 行 - |= 运算符实例，c 值为 = %d\n", c)

}
