pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Flat is Ownable {
    // VARIABLES
    string public id;
    enum StayStatus { undefined, booked, cancelled, checkedIn, checkedOut }
    enum Ratings { undefined, bad, ok, good }

    struct Stay {
        uint start;
        uint end;
        uint index;
        address guest;
        Ratings rating;
        StayStatus status;
    }

    mapping(bytes32 => Stay) public stays;
    bytes32[] internal stayKeys;

    // EVENTS
    event StayBooked(address guest, uint start, uint end);

    // CONSTRUCTOR
    constructor (string memory _id, address _host) public {
        id = _id;
        transferOwnership(_host);
    }

    // MODIFIERS
    // FUNCTIONS
    function getStayKey(address _guest, uint _start)
    public
    pure
    returns (bytes32)
    {
        return _getStayKey(_guest, _start);
    }

    function bookStay(uint start, uint end) public {
        // Generate Key
        bytes32 hash = getStayKey(msg.sender, start);

        // Store stay
        stays[hash].start = start;
        stays[hash].end = end;
        stays[hash].index = stayKeys.length;
        stays[hash].guest = msg.sender;
        stays[hash].status = StayStatus.booked;

        emit StayBooked(msg.sender, start, end);
    }

    function getStay(address _guest, uint _start)
    public
    view
    returns
    (
        uint end,
        StayStatus status,
        Ratings rating
    )
    {
        bytes32 hash = getStayKey(_guest, _start);
        end = stays[hash].end;
        rating = stays[hash].rating;
        status = stays[hash].status;
    }

    function _getStayKey(address _guest, uint _start)
    internal
    pure
    returns (bytes32)
    {
        return keccak256(abi.encodePacked(_guest, _start));
    }

    // CORE FUNCTIONS
    // function cancelStay(uint _start) public {
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
