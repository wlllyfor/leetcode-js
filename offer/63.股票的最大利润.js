function maxProfit(prices) {
  let minPrice = Infinity; // 初始化最低价格为正无穷大
  let maxProfit = 0; // 初始化最大利润为0

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i]; // 更新最低价格
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice; // 更新最大利润
    }
  }

  return maxProfit;
}