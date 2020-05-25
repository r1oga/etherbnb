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

    // function getStayKey(address guest, uint startDate)
    // internal
    // pure
    // returns (bytes32 memory)
    // {
    //
    // }
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
