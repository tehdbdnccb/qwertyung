import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ARENA_ADDRESS, ARENA_ABI, USDC_ADDRESS, USDC_ABI } from "../utils/constants";

export default function AgentCard({ agentId, signer }) {
  const [entropy, setEntropy] = useState(0);
  const [prizePool, setPrizePool] = useState("0");
  const [isAlive, setIsAlive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchState = async () => {
    if (!signer) return;
    const arenaContract = new ethers.Contract(ARENA_ADDRESS, ARENA_ABI, signer);
    
    try {
      const data = await arenaContract.arenaAgents(agentId);
      const currentEntropy = await arenaContract.getCurrentEntropy(agentId);
      
      setEntropy(Number(currentEntropy));
      setPrizePool(ethers.formatUnits(data.prizePool, 6)); // 6 decimals for USDC
      setIsAlive(data.isAlive);
    } catch (e) {
      console.error("Error fetching agent state:", e);
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [signer]);

  const handleBet = async () => {
    if (!signer) return alert("Connect wallet first!");
    setLoading(true);
    try {
      const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
      const arenaContract = new ethers.Contract(ARENA_ADDRESS, ARENA_ABI, signer);
      const betAmount = ethers.parseUnits("10", 6); // Bet 10 USDC

      // 1. Approve USDC
      const approveTx = await usdcContract.approve(ARENA_ADDRESS, betAmount);
      await approveTx.wait();

      // 2. Place Bet
      const betTx = await arenaContract.betOnAgent(agentId, betAmount);
      await betTx.wait();
      
      alert("Bet placed successfully!");
      fetchState();
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="border border-0g-accent/30 bg-0g-dark p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,204,0.1)] w-80">
      <h3 className="text-xl font-bold text-white mb-2">Agent ID: {agentId}</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1 text-gray-400">
          <span>Entropy (Decay)</span>
          <span className={entropy > 80 ? "text-0g-danger" : "text-0g-accent"}>{entropy}/100</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${entropy > 80 ? 'bg-0g-danger' : 'bg-0g-accent'}`} 
            style={{ width: `${entropy}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4 text-gray-300">
        <p>Prize Pool: <strong className="text-white">{prizePool} USDC</strong></p>
        <p>Status: <strong className={isAlive ? "text-green-400" : "text-0g-danger"}>{isAlive ? "ALIVE" : "LIQUIDATED"}</strong></p>
      </div>

      <button 
        onClick={handleBet} 
        disabled={!isAlive || loading}
        className="w-full bg-0g-accent hover:bg-teal-400 text-black font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Bet 10 USDC"}
      </button>
    </div>
  );
}