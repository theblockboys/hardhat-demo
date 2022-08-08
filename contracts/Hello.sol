// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Hello is Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _identityCounter;

    string public greeter;

    constructor() {
        greeter = "Jane Doe";
    }

    function greeterCount() external view returns(uint256) {
        return _identityCounter.current();
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

    function changeGreeter(string memory newGreeter) public {
        bytes memory b = bytes(newGreeter);
        require(b.length > 0, "Invalid newGreeter. Empty string not allowed.");

        greeter = newGreeter;
        _identityCounter.increment();
    }

    function reset() external onlyOwner {
        _identityCounter.reset();
        greeter = "Jane Doe";
    }
}