pragma solidity ^0.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./SolidityUnorderedKeySet.sol";


contract Flat is Ownable {
    using SafeMath for uint;
    using SolidityUnorderedKeySetLib for SolidityUnorderedKeySetLib.Set;

    // VARIABLES
    SolidityUnorderedKeySetLib.Set staysSet;
    string public id;
    enum Status { undefined, booked, checkedIn, checkedOut }
    enum Rating { undefined, bad, ok, good }

    struct Stay {
        address guest;
        uint start;
        uint end;
        Rating rating;
        Status status;
    }

    mapping(bytes32 => Stay) public stays;

    // EVENTS
    event StayBooked(address guest, uint start, uint end);
    event StayUpdated(address guest, uint start, uint end, Rating rating, Status status);
    event StayCancelled(address guest, uint start, uint end);

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
        bytes32 key = getStayKey(msg.sender, start);

        // Store stay
        staysSet.insert(key); // will fail if key already exists
        Stay storage s = stays[key];
        s.start = start;
        s.end = end;
        s.guest = msg.sender;
        s.status = Status.booked;
        // s.rating undefined

        emit StayBooked(msg.sender, start, end);
    }

    function getStay(address _guest, uint _start)
    public
    view
    returns
    (
        address guest,
        uint start,
        uint end,
        Status status,
        Rating rating
    )
    {
        bytes32 key = getStayKey(_guest, _start);
        require(staysSet.exists(key), "No stay exists for this guest & starting date pair");

        Stay storage s = stays[key];
        guest = s.guest;
        start = s.start;
        end = s.end;
        rating = s.rating;
        status = s.status;
    }

    // function cancelStay(uint _start)
    // public
    // {
    //     // get Stay's key
    //     bytes32 key = getStayKey(msg.sender, _start);
    //
    //     // check that caller has booked this stay
    //     address guest = stays[key].guest;
    //     require(guest == msg.sender, "Only the person who booked a Stay can cancel it");
    //
    //     // check that the start date is in more than 7 days
    //     uint seven = 7;
    //     require(now.add(seven.mul(1 days)) <= _start, "This Stay starts in less than 7 days: too late to cancel it");
    //
    //     // get index of Stay to delete
    //     uint indexStayToDelete = stays[key].index;
    //
    //     // Replace stay to be deleted with last stay in the array
    //     // Get key of stay in last position of the keys array
    //     bytes32 fillStayHash = stayKeys[stayKeys.length.sub(1)];
    //     // Update key at indexStayToDelete in keys array
    //     stayKeys[indexStayToDelete] = fillStayHash;
    //     // Set fillStay index to index of Stay to delete
    //     stays[fillStayHash].index = indexStayToDelete;
    //     // Reduce length of keys array
    //     // set key to null in mapping
    //
    // }

    function _getStayKey(address _guest, uint _start)
    internal
    pure
    returns (bytes32)
    {
        return keccak256(abi.encodePacked(_guest, _start));
    }

    // CORE FUNCTIONS
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
