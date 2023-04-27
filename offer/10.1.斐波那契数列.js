function fib(n) {
  const dp = [0, 1];
  const MOD = 1000000007;
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  }
  return dp[n];
}

console.log('fib(2)', fib(2));
console.log('fib(3)', fib(3));
console.log('fib(4)', fib(4));
console.log('fib(5)', fib(5));
console.log('fib(45)', fib(45));
console.log('fib(44)', fib(44));

// 滚动数组
function fib(n) {
  // n 小于等于 1 时，不需要定义变量，直接返回
  if (n <= 1) {
    return n;
  }
  // 初始值 p 为 0，q 为 1
  let p = 0,
    q = 1,
    r;
  const MOD = 1000000007;
  for (let i = 2; i <= n; i++) {
    // 对应到递推公式：F(n) = F(n - 1) + F(n - 2)
    r = (p + q) % MOD;
    p = q;
    q = r;
  }
  return r;
}
