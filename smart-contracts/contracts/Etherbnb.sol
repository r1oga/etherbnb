pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Flat.sol";


contract Etherbnb is Ownable {
    mapping (string => address) public flats; // hash => owner

    event FlatAdded(string hash, address flat);

    function addFlat(string memory _hash) public {
        Flat newFlat = new Flat(_hash, msg.sender);
        flats[_hash] = address(newFlat);
        emit FlatAdded(_hash, address(newFlat));
    }

    function getFlatAddress(string memory _flatHash)
    public
    view
    returns (address)
    {
        return flats[_flatHash];
    }
}
