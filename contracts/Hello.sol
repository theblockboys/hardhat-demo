// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Hello {
    using Counters for Counters.Counter;
    using Strings for uint256;
    address public owner;

    Counters.Counter private _identityCounter;

    string public greeter;

    constructor() {
        owner = msg.sender;
        greeter = "Jane Doe";
    }

    function greeting() external view returns(string memory) {

        string memory output = string(
            abi.encodePacked(
                "Hello, World! My name is ",
                greeter,
                ". The greeter has changed ",
                Strings.toString(_identityCounter.current()),
                " times."
            )
        );

        return output;
    }
}