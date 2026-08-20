import { useState } from "react";
import { connectWallet } from "../utils/ethers";
import AgentCard from "../components/AgentCard";
import "../app/globals.css"; // Assumes default next.js styling setup

export default function Home() {
  const [wallet, setWallet] = useState(null);

  const handleConnect = async () => {
    try {
      const connectedWallet = await connectWallet();
      setWallet(connectedWallet);
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-0g-accent selection:text-black">
      <header className="border-b border-gray-800 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black tracking-tighter uppercase text-white">
          Thermodynamic <span className="text-0g-accent">Arena</span>
        </h1>
        <button 
          onClick={handleConnect}
          className="border border-0g-accent text-0g-accent hover:bg-0g-accent hover:text-black font-semibold py-2 px-6 rounded-full transition-all"
        >
          {wallet ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "Connect to 0G"}
        </button>
      </header>

      <main className="p-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-8">
          <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Schrödinger's Degen
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch fully autonomous ERC-7857 agents battle entropy. Degens bet USDC. Agents spend it to buy 0G Compute and compress their memories into 0G Storage to survive.
          </p>
        </div>

        {wallet ? (
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Displaying Agent 1 for demo purposes */}
            <AgentCard agentId={1} signer={wallet.signer} />
          </div>
        ) : (
          <div className="text-center text-gray-500 border border-gray-800 p-12 rounded-xl bg-[#0a0a0a]">
            <p>Please connect your wallet to view the arena state.</p>
          </div>
        )}
      </main>
    </div>
  );
}