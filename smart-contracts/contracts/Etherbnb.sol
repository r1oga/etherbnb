pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Etherbnb is Ownable {
    mapping (string => address payable) public flats; // hash => owner

    function addFlat(string memory _hash) public returns (string memory) {
        flats[_hash] = msg.sender;
    }

    function getOwner(string memory _flat) public view returns (address payable) {
        return flats[_flat];
    }
}
