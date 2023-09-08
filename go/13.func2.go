// package main

// import (
// 	"fmt"
// 	"math"
// )

// func main() {
// 	/* 声明函数变量 */
// 	getSquareRoot := func(x float64) float64 {
// 		return math.Sqrt(x)
// 	}

// 	/* 使用函数 */
// 	fmt.Println(getSquareRoot(9))

// }

// package main

// import "fmt"

// func getSequence() func() int {
// 	i := 0
// 	return func() int {
// 		i += 1
// 		return i
// 	}
// }

// func main() {
// 	/* nextNumber 为一个函数，函数 i 为 0 */
// 	nextNumber := getSequence()

// 	/* 调用 nextNumber 函数，i 变量自增 1 并返回 */
// 	fmt.Println(nextNumber())
// 	fmt.Println(nextNumber())
// 	fmt.Println(nextNumber())

// 	/* 创建新的函数 nextNumber1，并查看结果 */
// 	nextNumber1 := getSequence()
// 	fmt.Println(nextNumber1())
// 	fmt.Println(nextNumber1())
// }

// package main

// import "fmt"

// func main() {
// 	// 定义一个匿名函数并将其赋值给变量add
// 	add := func(a, b int) int {
// 		return a + b
// 	}

// 	// 调用匿名函数
// 	result := add(3, 5)
// 	fmt.Println("3 + 5 =", result)

// 	// 在函数内部使用匿名函数
// 	multiply := func(x, y int) int {
// 		return x * y
// 	}

// 	product := multiply(4, 6)
// 	fmt.Println("4 * 6 =", product)

// 	// 将匿名函数作为参数传递给其他函数
// 	calculate := func(operation func(int, int) int, x, y int) int {
// 		return operation(x, y)
// 	}

// 	sum := calculate(add, 2, 8)
// 	fmt.Println("2 + 8 =", sum)

// 	// 也可以直接在函数调用中定义匿名函数
// 	difference := calculate(func(a, b int) int {
// 		return a - b
// 	}, 10, 4)
// 	fmt.Println("10 - 4 =", difference)
// }

package main

import (
	"fmt"
)

/* 定义结构体 */
type Circle struct {
	radius float64
}

func main() {
	var c1 Circle
	c1.radius = 10.00
	fmt.Println("圆的面积 = ", c1.getArea())
}

//该 method 属于 Circle 类型对象中的方法
func (c Circle) getArea() float64 {
	//c.radius 即为 Circle 类型对象中的属性
	return 3.14 * c.radius * c.radius
}
