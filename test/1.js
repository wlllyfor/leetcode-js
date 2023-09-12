function fillMissingData(arr) {
  const result = [];
  const startDate = new Date(arr[0].time);
  const endDate = new Date(startDate.getTime() + (180 * 24 * 60 * 60 * 1000)); // 180天后的日期

  let currentDate = startDate;
  let currentIndex = 0;

  while (currentDate <= endDate) {
    const currentDateString = currentDate.toISOString().split('T')[0];

    if (arr[currentIndex] && arr[currentIndex].time === currentDateString) {
      result.push(arr[currentIndex]);
      currentIndex++;
    } else {
      result.push({
        time: currentDateString,
        count: 0,
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

const arr = [
  {
    "time": "2023-03-10",
    "count": 5
  },
  {
    "time": "2023-04-12",
    "count": 4
  },
  {
    "time": "2023-05-12",
    "count": 11
  },
  {
    "time": "2023-06-13",
    "count": 1
  },
  {
    "time": "2023-07-14",
    "count": 1
  },
];

const filledData = fillMissingData(arr);
console.log(filledData);