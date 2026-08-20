// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IAgenticID
 * @dev Interface for 0G ERC-7857 Intelligent NFT Standard.
 */
interface IAgenticID {
    function ownerOf(uint256 tokenId) external view returns (address);
    function authorizeUsage(uint256 tokenId, address user) external;
}