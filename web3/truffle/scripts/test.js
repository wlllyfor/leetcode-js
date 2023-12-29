const Contracts = artifacts.require('StudentStorage.sol');

module.exports = async function (callback) { 

  const studentStorage = await Contracts.deployed()

  await studentStorage.setData('chriswlwang', 100)

  const res = await studentStorage.getData()
  const name = await studentStorage.name()
  const age = await studentStorage.age()
  console.log('res', res);
  console.log('name', name);
  console.log('age', age);
  callback();
}