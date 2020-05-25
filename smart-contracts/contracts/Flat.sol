pragma solidity ^0.6;

contract Flat {
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

    constructor (string memory _id) public {
        id = _id;
    }

}
