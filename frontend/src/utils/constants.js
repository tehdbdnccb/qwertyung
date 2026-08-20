export const CHAIN_ID = 16602; // 0G Galileo Testnet
export const ARENA_ADDRESS = "0x_YOUR_ARENA_CONTRACT_ADDRESS";
export const USDC_ADDRESS = "0x_YOUR_USDC_CONTRACT_ADDRESS";

export const ARENA_ABI = [
  "function arenaAgents(uint256 agentId) view returns (uint256 entropyLevel, uint256 lastUpdateBlock, uint256 prizePool, bool isAlive)",
  "function getCurrentEntropy(uint256 agentId) view returns (uint256)",
  "function betOnAgent(uint256 agentId, uint256 amount) external",
  "function enterArena(uint256 agentId) external"
];

export const USDC_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function faucet() external",
  "function balanceOf(address account) view returns (uint256)"
];