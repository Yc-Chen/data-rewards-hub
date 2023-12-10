// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
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
    
    address[256] private users;
    uint8 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("DataRewardsToken", "DRT")
        Ownable(initialOwner)
    {}

    function awardNFT(address user, uint8 tokenId)
        public onlyOwner
        returns (uint256)
    {
        console.log("Minting token %s for %s", tokenId, user);
        _mint(user, tokenId);
        users[tokenId] = user;
        return tokenId;
    }

    function getUsers () public onlyOwner view returns (address[256] memory) {
        return users;
    }

}
