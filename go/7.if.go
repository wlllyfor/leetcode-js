// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var a int = 10

// 	/* 使用 if 语句判断布尔表达式 */
// 	if a < 20 {
// 		/* 如果条件为 true 则执行以下语句 */
// 		fmt.Printf("a 小于 20\n")
// 	}
// 	fmt.Printf("a 的值为 : %d\n", a)
// }

// package main

// import "fmt"

// func main() {
// 	/* 局部变量定义 */
// 	var a int = 100

// 	/* 判断布尔表达式 */
// 	if a < 20 {
// 		/* 如果条件为 true 则执行以下语句 */
// 		fmt.Printf("a 小于 20\n")
// 	} else {
// 		/* 如果条件为 false 则执行以下语句 */
// 		fmt.Printf("a 不小于 20\n")
// 	}
// 	fmt.Printf("a 的值为 : %d\n", a)

// }

// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var a int = 100
// 	var b int = 200

// 	/* 判断条件 */
// 	if a == 100 {
// 		/* if 条件语句为 true 执行 */
// 		if b == 200 {
// 			/* if 条件语句为 true 执行 */
// 			fmt.Printf("a 的值为 100 ， b 的值为 200\n")
// 		}
// 	}
// 	fmt.Printf("a 值为 : %d\n", a)
// 	fmt.Printf("b 值为 : %d\n", b)
// }

// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var grade string = "B"
// 	var marks int = 90

// 	switch marks {
// 	case 90:
// 		grade = "A"
// 	case 80:
// 		grade = "B"
// 	case 50, 60, 70:
// 		grade = "C"
// 	default:
// 		grade = "D"
// 	}

// 	switch {
// 	case grade == "A":
// 		fmt.Printf("优秀!\n")
// 	case grade == "B", grade == "C":
// 		fmt.Printf("良好\n")
// 	case grade == "D":
// 		fmt.Printf("及格\n")
// 	case grade == "F":
// 		fmt.Printf("不及格\n")
// 	default:
// 		fmt.Printf("差\n")
// 	}
// 	fmt.Printf("你的等级是 %s\n", grade)
// }

// package main

// import "fmt"

// func main() {
// 	var x interface{}

// 	fmt.Print(x)

// 	switch i := x.(type) {
// 	case nil:
// 		fmt.Printf(" x 的类型 :%T", i)
// 	case int:
// 		fmt.Printf("x 是 int 型")
// 	case float64:
// 		fmt.Printf("x 是 float64 型")
// 	case func(int) float64:
// 		fmt.Printf("x 是 func(int) 型")
// 	case bool, string:
// 		fmt.Printf("x 是 bool 或 string 型")
// 	default:
// 		fmt.Printf("未知型")
// 	}
// }

// package main

// import (
// 	"fmt"
// 	"time"
// )

// func main() {

// 	c1 := make(chan string)
// 	c2 := make(chan string)

// 	go func() {
// 		time.Sleep(1 * time.Second)
// 		c1 <- "one"
// 	}()
// 	go func() {
// 		time.Sleep(2 * time.Second)
// 		c2 <- "two"
// 	}()

// 	for i := 0; i < 2; i++ {
// 		select {
// 		case msg1 := <-c1:
// 			fmt.Println("received", msg1)
// 		case msg2 := <-c2:
// 			fmt.Println("received", msg2)
// 		}
// 	}
// }

package main

import "fmt"

func main() {
	// 定义两个通道
	ch1 := make(chan string)
	ch2 := make(chan string)

	// 启动两个 goroutine，分别从两个通道中获取数据
	go func() {
		for {
			ch1 <- "from 1"
		}
	}()
	go func() {
		for {
			ch2 <- "from 2"
		}
	}()

	// 使用 select 语句非阻塞地从两个通道中获取数据
	for {
		select {
		case msg1 := <-ch1:
			fmt.Println(msg1)
		case msg2 := <-ch2:
			fmt.Println(msg2)
		default:
			// 如果两个通道都没有可用的数据，则执行这里的语句
			fmt.Println("no message received")
		}
	}
}
