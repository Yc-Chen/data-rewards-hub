// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DataRewardsToken is ERC721, Ownable {
    mapping(address => uint) public productIdToWallet;
    // a list of pending registrations
    mapping(address => bool) public pendingRegistrations;

    event NewRegistration(address wallet, string phrase);
    event RegistrationSuccess(address wallet);
    event RegistrationFailure(address wallet);

    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("DataRewardsToken", "DRT")
        Ownable(initialOwner)
    {}

    function awardNFT(address user)
        public onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(user, tokenId);

        return tokenId;
    }

    // called when user signs up after buying the physical product
    function register(string calldata phrase) public {
        require(!pendingRegistrations[msg.sender], "Already pending");
        pendingRegistrations[msg.sender] = true;
        emit NewRegistration(msg.sender, phrase);
    }

    // called by oracle when the product is registered
    function postRegistrationSuccess(address _to, uint256 productId) external onlyOwner {
        require(productIdToWallet[_to] == 0, "Already registered"); // is this really needed?
        pendingRegistrations[_to] = false;
        productIdToWallet[_to] = productId;
        emit RegistrationSuccess(_to);
    }

    // called by oracle when the product registration failed
    function postRegistrationFailure(address _to) external onlyOwner {
        pendingRegistrations[_to] = false;
        emit RegistrationFailure(_to);
    }

    // used for logging in with wallet or physical product!
    function isMember() public view returns (bool) {
        return productIdToWallet[msg.sender] != 0;
    }

    function isPending() public view returns (bool) {
        return pendingRegistrations[msg.sender];
    }

}
