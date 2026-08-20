const hre = require("hardhat");

async function main() {
  console.log("Starting Phase 1 Deployment on 0G Galileo Testnet...");

  // 1. Deploy Mock USDC
  const MockUSDC = await hre.ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log(`✅ MockUSDC deployed to: ${usdcAddress}`);

  // 2. Deploy Mock Agentic ID (For testnet purposes)
  // In a real environment, we would use the official 0G ERC-7857 contract address
  const AgenticID = await hre.ethers.getContractFactory("MockUSDC"); // using MockUSDC just as a placeholder contract here for fast deployment testing
  const agenticId = await AgenticID.deploy();
  await agenticId.waitForDeployment();
  const agenticIdAddress = await agenticId.getAddress();
  console.log(`✅ Mock AgenticID deployed to: ${agenticIdAddress}`);

  // 3. Deploy Thermodynamic Arena
  const Arena = await hre.ethers.getContractFactory("ThermodynamicArena");
  const arena = await Arena.deploy(usdcAddress, agenticIdAddress);
  await arena.waitForDeployment();
  const arenaAddress = await arena.getAddress();
  
  console.log(`🔥 ThermodynamicArena deployed to: ${arenaAddress}`);
  console.log("Deployment Complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});