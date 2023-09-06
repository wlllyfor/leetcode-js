// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var a int = 10

// 	/* for 循环 */
// 	for a < 20 {
// 		fmt.Printf("a 的值为 : %d\n", a)
// 		a++
// 		if a > 15 {
// 			/* a 大于 15 时使用 break 语句跳出循环 */
// 			break
// 		}
// 	}
// }

// package main

// import "fmt"

// func main() {

// 	// 不使用标记
// 	fmt.Println("---- break ----")
// 	for i := 1; i <= 3; i++ {
// 		fmt.Printf("i: %d\n", i)
// 		for i2 := 11; i2 <= 13; i2++ {
// 			fmt.Printf("i2: %d\n", i2)
// 			break
// 		}
// 	}

// 	// 使用标记
// 	fmt.Println("---- break label ----")
// re:
// 	for i := 1; i <= 3; i++ {
// 		fmt.Printf("i: %d\n", i)
// 		for i2 := 11; i2 <= 13; i2++ {
// 			fmt.Printf("i2: %d\n", i2)
// 			break re
// 		}
// 	}
// }

// package main

// import "fmt"

// func main() {
// 	day := "Tuesday"
// 	switch day {
// 	case "Monday":
// 		fmt.Println("It's Monday.")
// 	case "Tuesday":
// 		fmt.Println("It's Tuesday.")
// 		break // 跳出 switch 语句
// 	case "Wednesday":
// 		fmt.Println("It's Wednesday.")
// 	}
// }

// package main

// import (
// 	"fmt"
// 	"time"
// )

// func main() {
// 	ch1 := make(chan int)
// 	ch2 := make(chan int)

// 	go func() {
// 		time.Sleep(2 * time.Second)
// 		ch1 <- 1
// 	}()

// 	go func() {
// 		time.Sleep(1 * time.Second)
// 		ch2 <- 2
// 	}()

// 	select {
// 	case <-ch1:
// 		fmt.Println("Received from ch1.")
// 	case <-ch2:
// 		fmt.Println("Received from ch2.")
// 		break // 跳出 select 语句
// 	}
// }

// package main

// import (
// 	"fmt"
// 	"time"
// )

// func process(ch chan int) {
// 	for {
// 		select {
// 		case val := <-ch:
// 			fmt.Println("Received value:", val)
// 			// 执行一些逻辑
// 			if val == 5 {
// 				return // 提前结束 select 语句的执行
// 			}
// 		default:
// 			fmt.Println("No value received yet.")
// 			time.Sleep(500 * time.Millisecond)
// 		}
// 	}
// }

// func main() {
// 	ch := make(chan int)

// 	go process(ch)

// 	time.Sleep(2 * time.Second)
// 	ch <- 1
// 	time.Sleep(1 * time.Second)
// 	ch <- 3
// 	time.Sleep(1 * time.Second)
// 	ch <- 5
// 	time.Sleep(1 * time.Second)
// 	ch <- 7

// 	time.Sleep(2 * time.Second)
// }

package main

import (
	"fmt"
	"time"
)

func process(ch chan int, done chan bool) {
	for {
		select {
		case val := <-ch:
			fmt.Println("Received value:", val)
			// 执行一些逻辑
			if val == 5 {
				done <- true // 发送信号告知主程序停止执行
				return       // 提前结束 select 语句的执行
			}
		default:
			fmt.Println("No value received yet.")
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	ch := make(chan int)
	done := make(chan bool)

	go process(ch, done)

	time.Sleep(2 * time.Second)
	ch <- 1
	time.Sleep(1 * time.Second)
	ch <- 3
	time.Sleep(1 * time.Second)
	ch <- 5
	time.Sleep(1 * time.Second)
	ch <- 7

	<-done // 等待退出通道接收到信号

	time.Sleep(2 * time.Second)
}
