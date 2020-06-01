pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Flat is Ownable {
    // VARIABLES
    string public id;
    enum StayStatus { undefined, booked, cancelled, checkedIn, checkedOut }
    enum Ratings { undefined, bad, ok, good }

    struct Stay {
        uint startDate;
        uint endDate;
        uint index;
        address guest;
        Ratings rating;
        StayStatus status;
    }

    mapping(bytes32 => Stay) public stays;
    bytes32[] internal stayKeys;

    // EVENTS
    // CONSTRUCTOR
    constructor (string memory _id, address _host) public {
        id = _id;
        transferOwnership(_host);
    }

    // MODIFIERS
    // FUNCTIONS
    function getStayKey(address _guest, uint _startDate)
    public
    pure
    returns (bytes32)
    {
        return _getStayKey(_guest, _startDate);
    }

    function bookStay(uint startDate, uint endDate) public {
        // Generate Key
        bytes32 hash = getStayKey(msg.sender, startDate);

        // Store stay
        stays[hash].startDate = startDate;
        stays[hash].endDate = endDate;
        stays[hash].index = stayKeys.length;
        stays[hash].guest = msg.sender;
        stays[hash].status = StayStatus.booked;
    }

    function getStay(address _guest, uint _startDate)
    public
    view
    returns
    (
        uint endDate,
        StayStatus status,
        Ratings rating
    )
    {
        bytes32 hash = getStayKey(_guest, _startDate);
        endDate = stays[hash].endDate;
        rating = stays[hash].rating;
        status = stays[hash].status;
    }

    function _getStayKey(address _guest, uint _startDate)
    internal
    pure
    returns (bytes32)
    {
        return keccak256(abi.encodePacked(_guest, _startDate));
    }

    // CORE FUNCTIONS
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
