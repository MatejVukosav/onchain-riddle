// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OnchainRiddle {
    address public bot;
    string public riddle;
    bytes32 private answerHash;
    address public winner;
    bool public isActive;
    string[] public guesses;
    mapping(string => bool) private hasGuessed; // To prevent duplicate guesses

    event RiddleSet(string riddle);
    event AnswerAttempt(address indexed user, bool correct, string guess);
    event Winner(address indexed user, string guess);

    modifier onlyBot() {
        require(msg.sender == bot, "Only bot can call this function");
        _;
    }

    constructor() {
        bot = msg.sender;
    }

    function setRiddle(string memory _riddle, bytes32 _answerHash) external onlyBot {
        require(!isActive, "Riddle already active");
        riddle = _riddle;
        answerHash = _answerHash;
        isActive = true;
        winner = address(0);

        for (uint i = 0; i < guesses.length; i++) {
            delete hasGuessed[guesses[i]];
        }
        delete guesses;

        emit RiddleSet(_riddle);
    }

    function submitAnswer(string memory _answer) external {
        require(isActive, "No active riddle");
        require(winner == address(0), "Riddle already solved");
        require(!hasGuessed[_answer], "Answer already provided");

        guesses.push(_answer);
        hasGuessed[_answer] = true;

        if (keccak256(abi.encodePacked(_answer)) == answerHash) {
            winner = msg.sender;
            isActive = false;

            emit Winner(msg.sender, _answer);
        }

        emit AnswerAttempt(msg.sender, winner == msg.sender, _answer);
    }

    function getAllGuesses() public view returns (string[] memory) {
        return guesses;
    }
}