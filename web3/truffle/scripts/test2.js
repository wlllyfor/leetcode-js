const Contracts = artifacts.require('StudentListStorage.sol');

module.exports = async function (callback) { 

  const studentListStorage = await Contracts.deployed()

  await studentListStorage.addList('chriswlwang', 100)
  await studentListStorage.addList('ly', 100)

  // const list = await studentListStorage.StudentList(0)

  // console.log('list', list);

  const res = await studentListStorage.getList()
  console.log('res', res);
  callback();
}