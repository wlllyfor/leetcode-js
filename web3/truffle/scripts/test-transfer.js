const ChrisToken = artifacts.require('ChrisToken.sol');

const fromWei = (bn) => { 
  return web3.utils.fromWei(bn, 'ether')
}

const toWei = (bn) => { 
  return web3.utils.toWei(bn.toString(), 'ether')
}

module.exports = async function (callback) { 

  const cToken = await ChrisToken.deployed()

  const res1 = await cToken.balanceOf('0xDb3E3A31809891B69a4313F2590258d2ca843274')

  console.log('res1', fromWei(res1));

  await cToken.transfer('0x9d26B682D04dee5e83f78fcF43ab63525c706F36', toWei(10000), {
    from: '0xDb3E3A31809891B69a4313F2590258d2ca843274'
  })

  const res2 = await cToken.balanceOf('0xDb3E3A31809891B69a4313F2590258d2ca843274')

  console.log('res1', fromWei(res2));

  const res3 = await cToken.balanceOf('0x9d26B682D04dee5e83f78fcF43ab63525c706F36')

  console.log('res1', fromWei(res3));

  callback();
}