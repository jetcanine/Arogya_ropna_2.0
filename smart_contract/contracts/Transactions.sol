// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, string symptom2, string symptom3, string symptom4, string symptom5, string symptom6, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        string symptom2;
        string symptom3;
        string symptom4;
        string symptom5;
        string symptom6;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory symptom2, string memory symptom3, string memory symptom4, string memory symptom5, string memory symptom6, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, symptom2, symptom3, symptom4, symptom5, symptom6,  block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, symptom2, symptom3, symptom4, symptom5, symptom6,   block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}