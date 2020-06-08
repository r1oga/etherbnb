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
    event StayCancelled(address guest, uint start);

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
        // Get key
        bytes32 key = getStayKey(_guest, _start);
        // Check that stay exists
        require(staysSet.exists(key), "No stay exists for this guest & starting date pair");

        Stay storage s = stays[key];
        guest = s.guest;
        start = s.start;
        end = s.end;
        rating = s.rating;
        status = s.status;
    }

    function cancelStay(address guest, uint start)
    public
    {
        // Get key
        bytes32 key = getStayKey(guest, start);
        // Check that stay exists
        require(staysSet.exists(key), "No stay exists for this guest & starting date pair");

        // Only guest or owner can cancel a stay
        require(
            msg.sender == guest || msg.sender == owner(),
            "Only the flat owner or the guest who booked a stay can cancel it");

        // check that the start date is in more than 7 days
        uint seven = 7;
        require(now.add(seven.mul(1 days)) <= start, "This stay starts in less than 7 days: too late to cancel it");

        staysSet.remove(key);
        emit StayCancelled(guest, start);

    }

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
