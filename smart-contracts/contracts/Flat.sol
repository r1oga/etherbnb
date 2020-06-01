pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Flat is Ownable {
    string public id;
    enum StayStatus { booked, cancelled, checkedIn, checkedOut }
    enum Ratings { bad, ok, good }

    struct Stay {
        uint startDate;
        uint endDate;
        uint index;
        address guest;
        StayStatus status;
        Ratings rating;
    }

    mapping(bytes32 => Stay) public stays;

    constructor (string memory _id, address _host) public {
        id = _id;
        transferOwnership(_host);
    }

    function getStayKey(address _guest, uint _startDate)
    public
    pure
    returns (bytes32)
    {
        return _getStayKey(_guest, _startDate);
    }

    function _getStayKey(address _guest, uint _startDate)
    internal
    pure
    returns (bytes32)
    {
        return keccak256(abi.encodePacked(_guest, _startDate));
    }

    //
    // function bookStay(uint _startDate, uint _endDate) public {
    //
    // }
    //
    // function cancelStay(uint _startDate) public {
    //
    // }
    //
    // function checkIn() public {
    //
    // }
    //
    // function checkOut() public {
    //
    // }
    //
    // function withdraw() onlyOwner public {
    //
    // }
}
