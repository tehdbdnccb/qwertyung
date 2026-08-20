// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @dev Testnet USDC token for the 0G Thermodynamic Arena.
 * Includes a public faucet for testing purposes.
 */
contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {}

    // Public faucet: Gives 1,000 USDC (assuming 6 decimals like real USDC)
    function faucet() external {
        _mint(msg.sender, 1000 * 10**6);
    }

    // Override decimals to match standard USDC
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}