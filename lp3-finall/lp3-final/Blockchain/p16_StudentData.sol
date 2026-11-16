// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Practical 16: Student data using Structure, Array and Fallback
contract StudentData {

    struct Student {
        uint rollNo;
        string name;
        uint marks;
    }

    Student[] public students;      // array of structures

    function addStudent(uint _rollNo, string memory _name, uint _marks) public {
        students.push(Student(_rollNo, _name, _marks));
    }

    function getStudent(uint index) public view returns (uint, string memory, uint) {
        Student memory s = students[index];
        return (s.rollNo, s.name, s.marks);
    }

    function totalStudents() public view returns (uint) {
        return students.length;
    }

    // fallback runs when a function that does not exist is called
    uint public fallbackCount;
    fallback() external payable {
        fallbackCount = fallbackCount + 1;
    }

    receive() external payable {
        fallbackCount = fallbackCount + 1;
    }
}
