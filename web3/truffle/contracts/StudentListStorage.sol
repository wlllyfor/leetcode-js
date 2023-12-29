// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.16 <0.9.0;

contract StudentListStorage {
  
  struct Student {
    uint id;
    string name;
    uint age;
  }

  Student[] public StudentList;

  function addList(string memory _name, uint _age) public returns (uint) {
    uint count = StudentList.length;
    StudentList.push(Student(count + 1, _name, _age));
    return StudentList.length;
  }

  function getList() public view returns (Student[] memory) {
    return StudentList;
  }
}