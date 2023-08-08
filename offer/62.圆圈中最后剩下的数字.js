function lastRemaining(n, m) {
  let last = 0;
  for (let i = 2; i <= n; i++) {
    last = (last + m) % i;
  }
  return last;
}