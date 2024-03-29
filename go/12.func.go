// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var a int = 100
// 	var b int = 200
// 	var ret int

// 	/* 调用函数并返回最大值 */
// 	ret = max(a, b)

// 	fmt.Printf("最大值是 : %d\n", ret)
// }

// /* 函数返回两个数的最大值 */
// func max(num1, num2 int) int {
// 	/* 定义局部变量 */
// 	var result int

// 	if num1 > num2 {
// 		result = num1
// 	} else {
// 		result = num2
// 	}
// 	return result
// }

// package main

// import "fmt"

// func swap(x, y string) (string, string) {
// 	return y, x
// }

// func main() {
// 	a, b := swap("Google", "Runoob")
// 	fmt.Println(a, b)
// }

// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var a int = 100
// 	var b int = 200

// 	fmt.Printf("交换前 a 的值为 : %d\n", a)
// 	fmt.Printf("交换前 b 的值为 : %d\n", b)

// 	/* 通过调用函数来交换值 */
// 	swap(a, b)

// 	fmt.Printf("交换后 a 的值 : %d\n", a)
// 	fmt.Printf("交换后 b 的值 : %d\n", b)
// }

// /* 定义相互交换值的函数 */
// func swap(x, y int) int {
// 	var temp int

// 	temp = x /* 保存 x 的值 */
// 	x = y    /* 将 y 值赋给 x */
// 	y = temp /* 将 temp 值赋给 y*/

// 	return temp
// }

package main

import "fmt"

func main() {
	/* 定义局部变量 */
	var a int = 100
	var b int = 200

	fmt.Printf("交换前，a 的值 : %d\n", a)
	fmt.Printf("交换前，b 的值 : %d\n", b)

	/* 调用 swap() 函数
	 * &a 指向 a 指针，a 变量的地址
	 * &b 指向 b 指针，b 变量的地址
	 */
	swap(&a, &b)

	fmt.Printf("交换后，a 的值 : %d\n", a)
	fmt.Printf("交换后，b 的值 : %d\n", b)
}

func swap(x *int, y *int) {
	var temp int
	temp = *x /* 保存 x 地址上的值 */
	*x = *y   /* 将 y 值赋给 x */
	*y = temp /* 将 temp 值赋给 y */
}
