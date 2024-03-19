const textMap = {
  1: 'tiao',
  2: 'tong',
  3: 'wan'
}


export const createCurrentGameData = () => {
  try {
    const curGameData = localStorage.getItem('curGameData');
    if (curGameData) { 
      return JSON.parse(curGameData)
    }
    const map = {}
    for (let i = 1; i <= 9; i++) { 
      for (let j = 1; j <= 4; j++) { 
        for (let k = 1; k <= 3; k++) { 
          map[`${textMap[k]}-${i}-${j}`] = {
            position: 'in',
          }
        }
      }
    }

    sendData(map)

    localStorage.setItem('curGameData', JSON.stringify(map));
    return map;
  } catch (e) { 
    console.log('error', e);
  }
}

// 发牌
const sendData = (map) => { 
  const numbers = Object.keys(map)

  for (var j = 1; j <= 52; j++) {
    var randomIndex = Math.floor(Math.random() * numbers.length); // 生成随机索引
    var selectedNumber = numbers[randomIndex]; 
    map[selectedNumber].position = `p${j % 4 === 0 ? 4 : j % 4}`
    numbers.splice(randomIndex, 1); 
  }
}

const getBanker = () => { 
  
}

export const getRestNum = () => { 
  const curGameData = localStorage.getItem('curGameData');
  if (curGameData) { 
    return Object.values(JSON.parse(curGameData)).filter(item => item.position === 'in').length
  }
  return 0
}