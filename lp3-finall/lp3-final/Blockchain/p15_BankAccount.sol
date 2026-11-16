// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Practical 15: Bank account - deposit, withdraw, show balance
contract BankAccount {
    uint public balance;

    // put the amount (in wei) in the "Value" box of Remix, then click deposit
    function deposit() public payable {
        balance = balance + msg.value;
    }

    // amount in wei
    function withdraw(uint amount) public {
        require(amount <= balance, "Not enough balance");
        balance = balance - amount;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Transfer failed");
    }

    function showBalance() public view returns (uint) {
        return balance;
    }
}