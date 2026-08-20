import { ethers } from "ethers";
import { CHAIN_ID } from "./constants";

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("No crypto wallet found");
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const network = await provider.getNetwork();
  
  if (network.chainId !== BigInt(CHAIN_ID)) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toQuantity(CHAIN_ID) }],
      });
    } catch (switchError) {
      // If the network is not added to MetaMask, prompt to add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: ethers.toQuantity(CHAIN_ID),
            chainName: "0G Galileo Testnet",
            rpcUrls: ["https://evmrpc-testnet.0g.ai"],
            nativeCurrency: { name: "A0GI", symbol: "A0GI", decimals: 18 },
            blockExplorerUrls: ["https://scan-testnet.0g.ai/"]
          }],
        });
      } else {
        throw switchError;
      }
    }
  }
  
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  return { provider, signer, address: await signer.getAddress() };
};